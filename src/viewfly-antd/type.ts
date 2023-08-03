import { JSXInternal } from "@viewfly/core";
import { CSSProperties } from "@viewfly/platform-browser";
import { DefineSheet } from "./defineStyleSheet";

export type FC<T = any> = JSXInternal.ComponentConstructor<T>;
export type JSXNode = JSXInternal.JSXNode;
export type EventHandle<T> = (e: T) => any
export type Key = string | number
export type ClassNameMap<T extends string> = Record<T, string>;
export type CSSDifineMap = Record<number, DefineSheet>;

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

