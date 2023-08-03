import { HTMLAttributes } from "@viewfly/platform-browser"
import { CSSProperties, cssValue, useStyleSheetContext } from "../../defineStyleSheet"
import { defineStyleSheet, vfBase, vfColor } from "../../style/base.style"
import { FC } from "../../type"


export interface Navbar extends HTMLAttributes<HTMLElement> {
    /** 高度 */
    height?: number | string
}
/** 导航 */
export const Navbar: FC<Navbar> = (props) => {

    return () => {
        const { children, height = 60, style, ...rest } = props;
        const restStyle: CSSProperties = {
            height: cssValue('height', height),
            lineHeight: parseFloat(height as string) + 'px',
        }
        return (
            <header {...rest} class={styles.navbar} style={{ ...(style as any), ...restStyle }}>{children}</header>
        )
    }
}

const styles = defineStyleSheet('navbar', () => {
    const { className, define, s } = useStyleSheetContext()
    const navbar = className();
    define(s(navbar), {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: vfColor.baseBackground,
        maxWidth: '100%',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        padding: '0px 40px',
        zIndex: 1000,
        borderBottom: vfBase.border,

        [s('>*')]: {
            margin: 'auto'
        }
    })

    return { navbar }
})
