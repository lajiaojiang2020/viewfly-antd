


const map2url = (map: any) => {
    const res: string[] = [];
    for (let i in map) {
        res.push(`i=${map[i]}`)
    }
    return res.length > 0 ? '?' + res.join('&') : ''
}

const url2map = (url: string = '?') => {
    const res: any = {};
    url.substring(1).split('&').forEach(item => {
        let [k = '', v = ''] = item.split('=');
        k = k.trim();
        v = v.trim();
        if (k) {
            res[k] = v || null
        }
    })
    return res;
}

const eachTree = <T>(item: HashRouterImteType<T>, map: Record<string, HashRouterImteType<T>>) => {
    map[item.path] = item;
    item.children?.forEach(d => {
        d.path = item.path + d.path;
        eachTree(d, map)
    })
}
export type HashRouterNode<T = {}> = T & { type: any, props: any, children: HashRouterNode<T>[] }
export type HashRouterImteType<T = {}> = T & { children?: HashRouterImteType<T>[], path: string, component: any }
export type HashRouterChangedHandle<T = {}> = (data: HashRouterNode<T>) => any

class HashRouter<T = {}> {
    private history: { path: string, query: any }[] = [];
    private routerMap: Record<string, HashRouterImteType<T>> = {};
    private onChangeHandles: Array<HashRouterChangedHandle<T>> = []
    public active: string = ''
    constructor() {
        window.addEventListener('hashchange', this.pares);
    }

    private pares = () => {
        const hash = window.location.hash.substring(1);
        this.active = hash;
        let props: any = {};
        const path = hash.replace(/^(.+?)(\?.+?|)$/, (_x, x1: string, x2: string) => {
            props = url2map(x2);
            return x1;
        })
        const keys: string[] = []
        const last = path.split('/').reduce((pre, cur) => {
            pre ? keys.push(pre) : keys.push('/');
            return pre + '/' + cur;
        })
        keys.push(last);
        const each = (key: string) => {
            const router = this.routerMap[key];
            return this.createNode(router);
        }
        let root!: HashRouterNode<T>;
        let curr!: HashRouterNode<T>;
        keys.forEach((item) => {
            const node = each(item);
            root = root || node;
            if (node) {
                curr?.children.push(node)
                curr = node;
                if (item === last) {
                    node.props = props;
                }
            }
        });
        this.onChangeHandles.forEach(cb => cb(root))

    }

    private createNode = (item: HashRouterImteType<T>, props: any = {}): HashRouterNode<T> => {
        return (item && { type: item.component, props, children: [] }) as unknown as HashRouterNode<T>
    }

    public onChange = (callback: HashRouterChangedHandle<T>) => {
        this.onChangeHandles.push(callback);
        return () => {
            const i = this.onChangeHandles.indexOf(callback);
            i !== -1 && this.onChangeHandles.splice(i, 1)
        }
    }

    public addRouter = (item: HashRouterImteType<T>[]) => {
        item.forEach(item => this.routerMap[item.path] = item);
        this.pares();
    }

    /** 当没有子节点时 设置重定向 */
    public redirect = (props: { [k: string]: any, children?: any }, path: string, query: any = {}) => {
        if (!props.children || (Array.isArray(props.children) && props.children.length === 0))
            router.push(path, query)
    }

    /** 加入历史 */
    public push = (path: string, query: any = {}) => {
        path[0] !== '/' ? '/' + path : path;
        this.history.push({ path, query })
        window.location.hash = '#' + path + map2url(query)
    }
}

export const router = new HashRouter();

