import * as CSSTYPE from 'csstype';

export interface CSSProperties extends CSSTYPE.Properties<CSSValue> { };

/** 唯一标识 */
const _id = ((i = 0) => () => (i++, i))();

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

export type DefineStyle<C> = (methods: StyleSheetMethod) => C

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
    public defineStyleSheet = <C>(namespace: string, def: DefineStyle<C>): C => {
        const methods = new StyleSheetMethod(this.namespace, namespace);
        const classnames = def(methods);
        return this.repliceClassName(classnames) as C;
    }
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
        const id = _id();
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









