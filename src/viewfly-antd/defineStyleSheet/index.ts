import * as CSSTYPE from 'csstype';

export interface CSSProperties extends CSSTYPE.Properties<CSSValue> { };

type UUID<T> = T extends string ? string : number
/** 唯一标识 */
const uuid = ((i = 0) => <T>(v?: T): UUID<T> => (i++, v ? v + '-' + i : i) as UUID<T>)();

/** css变量 */
const variableId = (name: string, key: string) => `--${name}-${cssKey(key)}`;

type CSSValue = string | number

type CMap<T = any> = {
    [K in keyof T]: string
}
type KV = { key: string, value: string }

type VariableOption<T = any> = {
    variable: CMap<T>
    css: Record<string, KV>
}


export type DefineSheet = (CSSProperties & {
    [n: Selector]: DefineSheet;
})
type Selector = number

/** 声明变量 */
const careteVariable = <T>(name: string, data: T, value: VariableOption<any> = { variable: {}, css: {} } as VariableOption<T>, add: string = ''): CMap<T> => {
    const { variable, css } = value;
    const res: CMap<T> = {} as CMap<T>;
    for (let i in data) {
        const k = i + add
        const key = css[k]?.key || variableId(name + (add ? '-' + cssKey(add) : ''), i);
        variable[k] = res[i] = `var(${key})`;
        css[k] = { key, value: data[i] as any }
    }
    return res
}
const noPxKeys = ('opacity zoom lineHeight fontWeight zIndex').split(' ')
const cssKey = (k: string) => {
    return k.replace(/_/g, '-').replace(/[A-Z]/g, (x: string) => `-${x.toLocaleLowerCase()}`)
}
export const cssValue = (k: keyof CSSProperties, v: string | number) => {
    return k === 'content' ? '""' : typeof v === 'number' && !noPxKeys.includes(k) ? v + 'px' : v.toString();
}
const isNumber = (v: string) => {
    return /^[0-9]+$/.test(v);
}

export type DefineStyle<C> = (methods: StyleSheetMethod) => C;

const Context: StyleSheetMethod[] = [];

/** 样式表实例 */
export class CSSTSStyleSheet {

    private root = new CSSStyleSheet();
    private css: Record<string, KV> = {};
    /** 全局变量 */
    private _variable: Record<string, any> = {}
    /** 命名空间 */
    public readonly namespace: string;

    constructor(namespace: string) {
        this.namespace = namespace;
        document.adoptedStyleSheets.push(this.root);
    }
    /** 更新变量 */
    private updateRoot() {
        const css: string[] = [];
        for (let i in this.css) {
            const { key, value } = this.css[i];
            css.push(`${key}:${value}`)
        }
        this.root.replaceSync(`:root{${css.join(';')}}`);
    }

    /** css 变量 */
    public variable = <T>(data: Partial<T>, name?: string) => {
        const res = careteVariable<T>(this.namespace, data as any, { variable: this._variable, css: this.css }, name);
        this.updateRoot();
        return res;
    }

    /**  返回类名 */
    private repliceClassName<T>(classnames: T): T {
        const res = {} as T;
        for (let i in classnames) {
            const value = classnames[i] as string;
            res[i] = typeof value === 'object' ? this.repliceClassName(value as any) : value.replace(/^\./, '');
        }
        return res;
    }

    /** 定义样式表 */
    public defineStyleSheet = <C>(namespace: string, def: () => C): C => {
        const methods = new StyleSheetMethod(this.namespace, namespace);
        Context.push(methods);
        const classnames = def();
        Context.pop();
        return this.repliceClassName(classnames) as C;
    }

    /** 定义动画 */
    public defineAnimate = (keyframes: { [k: number]: CSSProperties, form?: CSSProperties, to?: CSSProperties }) => {
        const sheet = new CSSStyleSheet();
        const name = uuid('animate')
        const res: string[] = [];
        const parseStyle = (css: any) => {
            const res: string[] = []
            for (let i in css) {
                res.push(`${cssKey(i)}:${cssValue(i as any, css[i] as string)};`)
            }
            return res.join('\n');
        }
        for (let i in keyframes) {
            const key = isNumber(i) ? i + '%' : i;
            res.push(`${key} {${parseStyle(keyframes[i])}}`)
        }
        const str = `@keyframes ${name} {${res.join('\n')}}`;
        console.log(str)
        sheet.replaceSync(str);
        document.adoptedStyleSheets.push(sheet);
        /** animation-duration animation-timing-function animation-delay animation-iteration-count animation-direction animation-fill-mode animation-play-state; */
        return (setting = '') => {
            return `${name} ${setting}`
        }
    }


}

export const useStyleSheetContext = () => {
    const context = Context[Context.length - 1];
    return context || new StyleSheetMethod(uuid('vf'), uuid('vf'));
}

export class StyleSheetMethod {
    private namespace: string;
    private name: string;
    private selectorsMap: Record<number, string> = {};

    constructor(namespace: string, name: string) {
        this.namespace = namespace;
        this.name = name;
    }

    /** 添加父级 */
    private addParent(parents: string[], selector: string) {
        if (parents.length === 0)
            return [selector];
        const res: string[] = [];
        parents.forEach(parent => {
            if (selector[0] === '&')
                res.push(`${parent}${selector.substring(1)}`)
            else
                res.push(`${parent} ${selector}`)
        })
        return res;
    }


    /** 解析央视 */
    private parseStyle(selector: Selector, style: DefineSheet, list: string[], parent: string = '') {
        const res: string[] = [];
        const name = this.addParent(parent ? parent.split(',') : [], this.selectorsMap[selector]).join(',');
        const children: [Selector, DefineSheet, string[], string][] = []
        for (let i in style) {
            if (isNumber(i)) {
                children.push([Number(i), style[i] as DefineSheet, list, name])
            }
            else {
                res.push(`${cssKey(i)}:${cssValue(i as any, style[i] as string)};`)
            }
        }
        list.push(`${name}{${res.join('')}}`)
        children.forEach(args => this.parseStyle(...args));
    }

    public s = (s: string) => {
        const id = uuid();
        this.selectorsMap[id] = s;
        return id;
    }
    /** CSS类名 */
    public className = (name?: string): string => {
        return `.${this.namespace}-${this.name}` + (name ? `-${name}` : '');
    }

    /** 设置样式 */
    public define = (selector: Selector, style: DefineSheet) => {
        const sheet = new CSSStyleSheet();
        const res: string[] = [];
        this.parseStyle(selector, style, res);
        sheet.replaceSync(res.join(' '));
        document.adoptedStyleSheets.push(sheet);
        return res;
    }
}

/** 创建样式表 */
export const createStyleSheet = (namespace: string) => {
    return new CSSTSStyleSheet(namespace);
}









