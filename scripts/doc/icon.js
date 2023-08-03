//@ts-check
import * as SVGIcon from '@ant-design/icons-svg';
import { writeFileSync } from 'fs';
import { rootPath } from './base.js';
const icons = Object.assign({}, SVGIcon);

const iconPath = rootPath('@ant-design/icons/viewfly');

/**
 * 
 * @param {string} name 
 */
const component = (name) => {
    return `import { JSXInternal } from "@viewfly/core";
import { VFIcon ,VFIconProps} from "./icon";
import {${name} as svg} from "@ant-design/icons-svg";

export const ${name}:JSXInternal.ComponentConstructor<VFIconProps> = (props) => {
    return ()=><VFIcon {...props} svg={svg} />
}`
}

const main = async () => {
    /**@type {string[]}*/
    const exportList = []
    for (let i in icons) {
        if (i !== 'default' && i[0] !== '_') {
            exportList.push(`export * from "./${i}"`)
        }
        writeFileSync(`${iconPath}/${i}.tsx`, component(i))
    }
    writeFileSync(`${iconPath}/index.ts`, exportList.join(';\n'))
}

main()