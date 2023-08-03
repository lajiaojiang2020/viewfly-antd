import { defineStyleSheet, FC, useStyleSheetContext } from "@antd/viewfly/ui";
import { CSSProperties, HTMLAttributes } from "@viewfly/platform-browser";


/**
 * @api
 */
export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
    /** 对齐方式*/
    align?: 'start' | 'end' | 'center' | 'baseline'
    /** 间距大小
     * @default 10
     */
    size?: number | number[]
    /** 是否自动换行，仅在 horizontal 时有效
     * @default false
     */
    wrap?: boolean
    /** 指定排列方向
     * @default horizontal
     */
    direction?: 'horizontal' | 'vertical'
}
/** 间隔 */
export const Space: FC<SpaceProps> = (props) => {
    return () => {
        const {
            children,
            style,
            align,
            wrap,
            size = 10,
            direction = 'horizontal',
            class: className,
            ...rest
        } = props;
        const list = !children ? [] : (Array.isArray(children) ? children : [children]);
        const resStyle: CSSProperties = {
            alignItems: align,
            gap: Array.isArray(size) ? size.map(s => s + 'px').join(' ') : size + 'px',
            flexWrap: wrap && 'wrap',
            flexDirection: direction === 'vertical' ? 'column' : 'row',
            ...style as any
        }
        return (
            <div {...rest} class={[styles.space, className as any]} style={resStyle} >
                {list.map((node, i) => (
                    <div class={styles.item} key={i}>{node}</div>
                ))}
            </div>
        )
    }
}
const styles = defineStyleSheet('space', () => {
    const { className, define, s } = useStyleSheetContext();
    const space = className();
    const item = className('item');

    define(s(space), {
        display: 'inline-flex'
    })

    return { space, item }
})


