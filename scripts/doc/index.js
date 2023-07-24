
import { readdir, readFile, stat, writeFile } from 'fs/promises';
import { join } from 'path';
import { rootPath } from './base.js';


const pagesPath = rootPath('/docs/pages');
const routerConfigPath = rootPath('/docs/@RouterConfig/index.ts');
const demoPath = rootPath('/docs/@demo/index.ts')
const demoComponentPath = rootPath('/docs/@demo/components.ts')

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
                const p = [...parent, dir].join('/')
                if (isDemo(fName)) {
                    const text = await readFile(url);
                    const data = { label: '', content: '', code: '' }
                    const code = text.toString().replace(/\/\*([^\/]*)\*\//g, (_x, x1) => {
                        /** @type {string} */
                        const str = x1;
                        if (str.includes('@label')) {
                            str.replace(/(\*|\n|\r)/g, '').replace(/^(.+?)@label(.+?)@content(.+?)$/, (_x, _x1, x2, x3) => {
                                data.label = x2.trim();
                                data.content = x3.trim();
                                return ''
                            })
                            return ''
                        }
                        return _x;
                    });
                    data.code = code
                    const namelist = (parent.join('.') + '.' + fName).split('.');
                    const nameStr = namelist.join('.');
                    const exportName = namelist.join('_');
                    demos.push(`"${nameStr}":{label:"${data.label}",content:"${data.content}",code:\`${data.code}\`}`)
                    demoComponentImports.push(`import ${exportName} from "@/docs/pages/${p.replace(/\.tsx$/, '')}";`)
                    demoComponentMap.push(`"${nameStr}":${exportName}`)
                }
                else {
                    const importName = fName === 'index' ? parent.join('/') : p
                    const moduleName = getFileName(p)
                    imports.push(`import ${moduleName} from "@/docs/pages/${importName}"`)
                    routers.push(`{ path:"/${importName}",component:${moduleName} }`);
                }
            }
        }
    }
    await read(pagesPath, []);
    await Promise.all([
        writeFile(routerConfigPath, [imports.join(';\n'), `export default [${routers.join(',')}]`].join(';\n')),
        writeFile(demoPath, `export default {${demos.join(',')}}`),
        writeFile(demoComponentPath, [demoComponentImports.join(';\n'), `export default {${demoComponentMap.join(',')}}`].join('\n\n')),
    ])
    console.timeEnd('编译成功')
}
main()


//console.log(SVGIcon)