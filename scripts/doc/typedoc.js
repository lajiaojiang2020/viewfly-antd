//@ts-check

import { readFileSync } from 'fs';
import { readFile, unlink } from 'fs/promises';
import { dirname, join } from 'path';
import { Application, TSConfigReader } from 'typedoc';
import { fileURLToPath } from 'url'
import { rootPath } from './base.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);


/**
 * 
 * @param {import('./type').Children} item 
 */
const isMain = (item) => {
    return !!item.comment?.blockTags?.find(d => d.tag === '@api')
}

let i = 0
/**
 * 
 * @param {string} path 
 */
export const getTypeJson = async (path) => {
    try {
        i++;
        const app = new Application();
        app.options.addReader(new TSConfigReader());

        await app.bootstrapWithPlugins({
            entryPoints: [
                path,

            ]
        })
        /**@type {import('./type').Table[]} */
        const tables = [];
        /**@type {Record<string,import('./type').Children>} */
        const map = {};
        /**@type {import('./type').Children|null} */
        let entry = null

        const project = app.convert();
        if (project) {
            const name = Date.now() + '_' + i;
            const jsonName = name + '.json'
            const outputDir = join(_dirname, './../_temp');
            const jsonDir = join(outputDir, jsonName);
            await app.generateJson(project, jsonDir);
            const buffer = await readFile(jsonDir);
            unlink(jsonDir)
            /** @type {import('./type').Declaration} */
            const json = JSON.parse(buffer.toString());
            json.children?.forEach((item) => {
                map[item.name] = item;
                if (isMain(item)) {
                    entry = item;
                }
            })
            /**
             * 类型
             * @param {import('./type').Type} typeDes 
             */
            const parseType = (typeDes) => {
                const name = typeDes.name;
                if (map[name]) {
                    const tt = map[name]
                    if (tt.type?.type === 'union') {
                        return parseType(map[name].type)
                    }
                    createTable(tt);
                }
                /** 字符换枚举 */
                if (typeDes.type === 'literal') {
                    return `'${typeDes.value}'`
                }
                /** 基本类型 */
                if (typeDes.type === 'intrinsic') {
                    return typeDes.name
                }
                /** a|b */
                if (typeDes.type === 'union') {
                    return typeDes.types?.map(t => parseType(t)).join('|');
                }
                /** 数组 */
                if (typeDes.type === 'array' && typeDes.elementType) {
                    return `${parseType(typeDes.elementType)}[]`
                }
                /** 结构体 */
                if (typeDes.type === 'reference') {
                    const name = typeDes.name;
                    if (typeDes.typeArguments && typeDes.typeArguments.length > 0) {
                        return `${name}<${typeDes.typeArguments.map(t => parseType(t)).join(',')}>`
                    }
                    return name
                }
                /** 方法 */
                if (typeDes.type === 'reflection' && typeDes.declaration && typeDes.declaration.signatures) {
                    const d = typeDes.declaration.signatures[0];
                    const parameters = d?.parameters?.map(item => `${item.name}:${parseType(item.type)}`).join(',') ?? '';
                    return `(${parameters})=>${parseType(d?.type)}`
                }
            }

            /**
             * 表格
             * @param {import('./type').Children} entry 
             */
            const createTable = (entry) => {
                /**@type {import('./type').Children} */
                const d = entry;
                if (d.isParse) {
                    return;
                }
                d.isParse = true;
                /** @type {import('./type').Table} */
                const table = { name: d.name, data: [] }
                tables.push(table);
                d.children.forEach(col => {
                    const description = (col.comment?.summary?.map(v => v.text)?.join(';')) ??
                        (col.type?.declaration?.signatures?.[0]?.comment?.summary?.map(v => v.text)?.join(';')) ?? '-';
                    const defaultValue = col.comment?.blockTags?.find(v => v.tag === '@default')?.content?.map(v => v.text.replace(/```ts\n(.+?)\n```/img, '$1')).join(';') ?? '-'
                    table.data.push({
                        name: col.name,
                        description,
                        isOptional: col.flags?.isOptional ?? false,
                        type: parseType(col.type),
                        defaultValue
                    })
                })
            }
            if (entry) {
                createTable(entry)
            }
            // console.log(JSON.stringify(tables, null, 2))
            return tables
        }
    } catch (e) {
        //console.error(e)
    }
    return []
}

