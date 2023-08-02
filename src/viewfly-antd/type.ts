import { JSXInternal } from "@viewfly/core";
import { CSSProperties } from "@viewfly/platform-browser";

export type FC<T = any> = JSXInternal.ElementClass<T>;
export type JSXNode = JSXInternal.JSXChildNode;
export type EventHandle<T> = (e: T) => any
export type Key = string | number

export type SizeType = 'small' | 'middle' | 'large'
export const Sizes: SizeType[] = ['small', 'middle', 'large'];
/** 公共属性 */
export interface ComponentCommProps {
    /** 类 */
    clsss: string
    /** 样式 */
    style?: CSSProperties
    /** 子节点 */
    children?: JSXNode
}

