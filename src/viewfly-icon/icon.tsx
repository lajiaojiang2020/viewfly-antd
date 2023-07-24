import { defineStyleSheet } from "@antd/viewfly/ui"
import { JSXInternal, jsx } from "@viewfly/core"
import { HTMLAttributes } from "@viewfly/platform-browser"


interface SVGNode {
    tag: string
    attrs: any
    children?: SVGNode[]
}

export interface VFIconProps extends HTMLAttributes<HTMLSpanElement> {
    svg?: any
}
export const VFIcon: JSXInternal.ElementClass<VFIconProps> = (props) => {
    const toNode = (e: SVGNode): any => {
        if (e?.tag) {
            const props = { ...e.attrs, children: e.children?.map(toNode) };
            if (e.tag === 'svg') {
                props.width = '1em';
                props.height = '1em';
                props.fill = 'currentColor';
            }
            return jsx(e.tag, props)
        }
        return null
    }
    const node = toNode(typeof props.svg.icon === 'function' ? props.svg.icon(null, 'transparent') : props.svg.icon);
    return () => {
        const { svg, class: className, ...rest } = props;
        return <span {...rest} role="img" class={[styles.icon, className as any]} >{node}</span>
    }
}

const styles = defineStyleSheet('icon', ({ className, define, s }) => {
    const icon = className();
    define(s(icon), {
        display: 'inline-flex',
        alignItems: 'center',
        color: 'inherit',
        fontStyle: 'normal',
        lineHeight: 0,
        textAlign: 'center',
        textTransform: 'none',
        verticalAlign: '-0.125em',
        textRendering: 'optimizeLegibility',
    })
    return { icon }
})