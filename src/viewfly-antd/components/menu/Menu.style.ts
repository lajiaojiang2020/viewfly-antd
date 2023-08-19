import { defineStyleSheet, vfBase, vfColor, DefineSheet, useStyleSheetContext } from "@antd/viewfly/ui";


export const menuStyles = defineStyleSheet('menu', () => {
    const { className, define, s } = useStyleSheetContext()
    const menu = className();
    const menuRoot = className('is-root');
    const item = className('item');
    const sub = className('sub');
    const disabled = className('disabled');
    const titleView = className('title-view')
    const title = className('title')
    const label = className('label')
    const icon = className('icon')
    const divider = className('divider')
    const group = className('group')
    const action = className('action');
    const isOpen = className('is-open')



    const actionStyle: DefineSheet = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'currentcolor',
        borderRadius: 6,
        transition: 'background .3s cubic-bezier(.645,.045,.355,1),transform .3s cubic-bezier(.645,.045,.355,1),top .3s cubic-bezier(.645,.045,.355,1),color .3s cubic-bezier(.645,.045,.355,1)',
        content: " "
    }

    define(s(menu), {
        margin: 0,
        padding: 0,
        color: vfColor.primaryText,
        fontSize: 14,
        listStyle: 'none',
        marginBottom: 0,
        paddingInlineStart: 0,
        outline: 0,
        transition: '.3s cubic-bezier(.2,0,0,1) 0s',
        overflow: 'hidden',

        [s(item)]: {
            padding: '5px 2.5px',
            position: 'relative',
            [s(`&>${titleView}:hover`)]: {
                borderRadius: 5,
                cursor: 'pointer',
                backgroundColor: vfColor.hoverBackground
            }
        },

        [s(label)]: {
            marginLeft: 6,
            fontWeight: 'normal',
            fontSize: 12,
            opacity: 0.67
        },

        [s(icon)]: {
            marginRight: 10
        },

        [s(`&${menuRoot}`)]: {
            borderRight: vfBase.border,
            [s(`>${group}>${titleView}`)]: {
                borderBottom: vfBase.border,
                paddingLeft: '24px!important'
            }
        },

        [s(`${group}>${titleView}`)]: {
            color: vfColor.disabledText
        },

        [s(`${sub}`)]: {
            backgroundColor: vfColor.overlayBackground,
            [s(`&>div:nth-child(1)`)]: {
                backgroundColor: vfColor.baseBackground,
            }
        },
        [s(divider)]: {
            borderBottom: vfBase.border
        },

        [s(titleView)]: {
            height: 40,
            lineHeight: '40px',
            listStylePosition: 'inside',
            transition: 'background .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1)',
        },
        [s(action)]: {
            position: 'absolute',
            right: 16,
            top: '50%',
            width: 6,
            height: 1.5,
            transform: 'translateY(-50%)',

            [s(`&${isOpen}`)]: {
                [s('&:before')]: {
                    transform: 'rotate(45deg) translateX(2.5px)',
                },

                [s('&:after')]: {
                    transform: 'rotate(-45deg) translateX(-2.5px)'
                }
            },

            [s('&:before')]: {
                ...actionStyle,
                transform: 'rotate(-45deg) translateX(2.5px)',
            },

            [s('&:after')]: {
                ...actionStyle,
                transform: 'rotate(45deg) translateX(-2.5px)'
            }
        }
    })

    return {
        menu, menuRoot, item, disabled, label, title,
        icon, titleView, sub, divider, group, action, isOpen
    }
})