import { FC } from "@antd/viewfly/ui"


/**
 * @api
 */
export interface OutlineProps {
    /** 设置 大纲 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数*/
    target: () => HTMLElement

    /** 屏幕位置
     * @default ['auto','auto','20px','10px']
     */
    position?: string[]
}
/** 大纲  */
export const Outline: FC<OutlineProps> = () => {


    return () => {
        return (
            <div>
            </div>
        )
    }
}