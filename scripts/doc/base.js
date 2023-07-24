//@ts-check
import { dirname, join } from 'path';
import { fileURLToPath } from 'url'

export const _filename = fileURLToPath(import.meta.url);
export const _dirname = dirname(_filename);

/**
 * 根路径
 * @param {string[]} args 
 */
export const rootPath = (...args) => {
    return join(_dirname, './../../src/', ...args)
}