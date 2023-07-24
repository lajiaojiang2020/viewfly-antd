import { onPropsChanged, useSignal } from "@viewfly/core";
import { CSSProperties, HTMLAttributes } from "@viewfly/platform-browser";
import { cls } from "../../classNames";
import { defineStyleSheet } from "../../style/base.style";
import { FC } from "../../type";

const ID = { id: 1 };
export interface ScrollViewCssProps {
    base?: CSSProperties,
    thumb?: CSSProperties,
    track?: CSSProperties
}
const ScrollViewCss: FC<ScrollViewCssProps> = (_props) => {
    const state = useSignal<string>('');

    const className = (() => {
        const id = ID.id;
        ID.id++;
        return `__scrollview__${id}`;
    })();

    const updateCss = (props: ScrollViewCssProps) => {
        const { base, thumb, track } = props as ScrollViewCssProps;
        let css: string[] = [];
        base && css.push(/* css */`
        .${className}::-webkit-scrollbar {
            ${style2css(base)}
        })
        `);
        thumb && css.push(/* css */`
        .${className}::-webkit-scrollbar-thumb {
            ${style2css(thumb)}
        })
        `);
        track && css.push(/* css */`
        .${className}::-webkit-scrollbar-track {
            ${style2css(track)}
        })
        `);
        state.set(css.join(''))
    }

    onPropsChanged<ScrollViewCssProps>(props => {
        updateCss(props as ScrollViewCssProps)
    })
    return () => state.length > 0 ? <style>{state}</style> : null
}

export interface ScrollViewProps extends HTMLAttributes<HTMLDivElement> {
    /** 滚动条样式 */
    scrollbarStyle?: ScrollViewCssProps
    /** 是否X方向 */
    scrollX?: boolean;
    /** 是否Y方向 */
    scrollY?: boolean;
}
/** 滚动容器 */
export const ScrollView: FC<ScrollViewProps> = (_props) => {
    return () => {
        const { scrollbarStyle, scrollX, scrollY = true, children, ...props } = _props
        return (
            <>
                <ScrollViewCss {...scrollbarStyle} />
                <div {...props} class={styles.container} >
                    <div class={cls(styles.scrollbar, scrollX && styles.scrollbarX, scrollY && styles.scrollbarY)} >
                        <div class={styles.body} >{children}</div>
                    </div>
                </div>
            </>
        )
    }
}

const humpToUnderline = (str: string) => {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}
const style2css = (style: CSSProperties) => {
    const css: string[] = [];
    for (let i in style) {
        const val = (style as any)[i];
        const value = typeof val === 'number' ? val + 'px' : val;
        css.push(`${humpToUnderline(i)}:${value}!important;`)
    }
    return css.join('');
}

const styles = defineStyleSheet('scroll-view', ({ className, define, s }) => {
    const container = className();
    const scrollbar = className('scrollbar')
    const scrollbarX = className('scrollbar-x');
    const scrollbarY = className('scrollbar-y');
    const body = className('body');

    define(s(container), {
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        position: 'relative',
        [s(scrollbar)]: {
            overflow: "hidden",
            width: "100%",
            height: "100%",

            [s(`&::-webkit-scrollbar`)]: {
                width: "10px",
                height: "10px",
            },

            [s(`&::-webkit-scrollbar-thumb`)]: {
                cursor: "pointer",
                backgroundColor: "#acacac",
                borderRadius: "5px",
            },

            [s(`&::-webkit-scrollbar-track`)]: {
                borderRadius: "0px",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                boxShadow: "none",
            },

            [s(`&${scrollbarX}`)]: {
                overflowX: "auto",

                [s(body)]: {
                    width: "max-content",
                }
            },

            [s(`&${scrollbarY}`)]: {
                overflowY: "auto",
                [s(body)]: {
                    height: "max-content",
                }
            },

            [s(body)]: {
                width: "100%",
                height: "100%",
                minWidth: "100%",
                display: "flex",
                flexDirection: "column",
            }
        }
    })

    return { container, scrollbar, scrollbarX, scrollbarY, body }
})



