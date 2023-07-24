//@ts-check

import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { Application, TSConfigReader } from 'typedoc';
import { fileURLToPath } from 'url'

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

console.log(_filename, _dirname)

/**
 * 根路径
 * @param {string[]} args 
 */
const rootPath = (...args) => {
    return join(_dirname, './../../src/viewfily-antd/', ...args)
}
/**
 * 组件路径
 * @param {string} name 
 */
// @ts-ignore
const componentRootPath = (name) => {

}

let i = 0
/**
 * 
 * @param {string} path 
 */
export const getTypeJson = async (path) => {
    i++;
    const app = new Application();
    app.options.addReader(new TSConfigReader());

    await app.bootstrapWithPlugins({
        entryPoints: [rootPath(path)]
    })

    const project = app.convert();
    if (project) {
        const name = Date.now() + '_' + i;
        const jsonName = name + '.json'
        const outputDir = join(_dirname, './../_temp');
        const jsonDir = join(outputDir, jsonName);
        await app.generateJson(project, jsonDir);
        const buffer = await readFile(jsonDir);
        const json = JSON.parse(buffer.toString());
        json.children?.forEach(item => {
            console.log(item)
        })

    }
}

