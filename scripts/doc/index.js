//@ts-check
import { readdir, readFile, stat, writeFile } from 'fs/promises';
import { join } from 'path';
import { rootPath } from './base.js';
import { getTypeJson } from './typedoc.js';


const pagesPath = rootPath('/docs/pages');
const routerConfigPath = rootPath('/docs/@RouterConfig/index.ts');
const demoPath = rootPath('/docs/@demo/index.ts')
const demoComponentPath = rootPath('/docs/@demo/components.ts');
const menuPath = rootPath('/docs/@menu/index.ts')
const apiPath = rootPath('/docs/@api/index.ts')
/**
 * 
 * @param {string} name 
 * @returns {string}
 */
const componentPath = (name) => rootPath('/viewfly-antd/components/' + name + '/index.ts')
/**
 * 
 * @param {string} str 
 * @returns {string}
 */
const fileName = (str) => {
    return str.split('/').join('_')
}
/**
 * 
 * @param {string} name 
 * @returns {boolean}
 */
const isTsx = (name) => {
    return name.split('.').pop() === 'tsx'
}
/**
 * 
 * @param {string} name 
 * @returns {boolean}
 */
const isDemo = (name) => {
    return name.split('.').pop() === 'demo'
}
/**
 * 
 * @param {string} name 
 * @returns {string}
 */
const getFileName = (name) => {
    return fileName(removeFileType(name).join('.'))
}
/**
 * 
 * @param {string} name 
 * @returns 
 */
const removeFileType = (name) => {
    const list = name.split('.');
    list.pop();
    return list
}
/**
 * @param {string} code 
 * @param {string} token 
 */
const comment2map = (code, token) => {
    let success = false
    /**@type {*} */
    const data = {};
    const res = code.toString().replace(/\/\*([^\/]*)\*\//g, (_x, x1) => {
        /** @type {string} */
        const str = x1;
        if (str.includes('@' + token)) {
            str.replace(/(\*|\n|\r)/g, '').replace(/@([^@]+?)\s+([^@]*)/g, (_x, x1, x2) => {
                const key = x1.trim();
                const value = x2.trim();
                data[key] = value;
                success = true
                return ''
            })
            return ''
        }
        return _x;
    });
    return { res, data, success }
}

const main = async () => {
    console.time('编译成功')
    /** @type {string[]} */
    const routers = []
    /** @type {string[]} */
    const imports = []
    /** @type {string[]} */
    const demos = []
    /** @type {string[]} */
    const demoComponentImports = []
    /** @type {string[]} */
    const demoComponentMap = []
    /** @type {string[]} */
    const menu = []
    /** @type {Record<string,any>} */
    const api = {}

    /**
     * @param {string} root 
     * @param {string[]} parent 
     */
    const read = async (root, parent = []) => {
        const dirs = await readdir(root);
        for await (let dir of dirs) {
            const url = join(root, dir);
            const state = await stat(url);
            if (state.isDirectory()) {
                await read(url, [...parent, dir])
            }
            else if (isTsx(dir)) {
                const fName = getFileName(dir);
                const p = [...parent, dir].join('/');
                const text = await readFile(url);
                if (isDemo(fName)) {
                    const { res, data } = comment2map(text.toString(), 'label');
                    data.code = res;
                    const namelist = (parent.join('.') + '.' + fName).split('.');
                    const nameStr = namelist.join('.');
                    const exportName = namelist.join('_');
                    demos.push(`"${nameStr}":{label:"${data.label}",content:"${data.content}",code:\`${data.code}\`}`)
                    demoComponentImports.push(`import ${exportName} from "@/docs/pages/${p.replace(/\.tsx$/, '')}";`)
                    demoComponentMap.push(`"${nameStr}":${exportName}`)
                }
                else {
                    const importName = fName === 'index' ? parent.join('/') : p;
                    const routerPath = `/${importName}`
                    /** @type {string} */
                    let cpath = '';
                    p.replace(/components\/(.+?)\/index\.tsx/, (_x, x1) => {
                        /**@type {string} */
                        const componentName = x1
                        if (componentName) {
                            cpath = componentPath(componentName);
                        }
                        return ''
                    })
                    if (cpath) {
                        const tables = await getTypeJson(cpath);
                        tables.length > 0 && (api[routerPath] = tables);
                    }
                    const moduleName = getFileName(p);
                    const { data, success } = comment2map(text.toString(), 'title');
                    data.path = routerPath;
                    if (success) {
                        menu.push(JSON.stringify(data))
                    }
                    imports.push(`import ${moduleName} from "@/docs/pages/${importName}"`)
                    routers.push(`{ path:"${routerPath}",component:${moduleName} }`);
                }
            }
        }
    }
    await read(pagesPath, []);
    await Promise.all([
        writeFile(routerConfigPath, [imports.join(';\n'), `export default [${routers.join(',')}]`].join(';\n')),
        writeFile(demoPath, `export default {${demos.join(',')}}`),
        writeFile(demoComponentPath, [demoComponentImports.join(';\n'), `export default {${demoComponentMap.join(',')}}`].join('\n\n')),
        writeFile(menuPath, `export default [${menu.join(',')}]`),
        writeFile(apiPath, `export default ${JSON.stringify(api, null, 2)} `)
    ])
    console.timeEnd('编译成功')
}
main()


//console.log(SVGIcon)