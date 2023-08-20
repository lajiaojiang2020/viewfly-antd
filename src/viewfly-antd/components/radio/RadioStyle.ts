import { useStyleSheetContext } from "@/viewfly-antd/defineStyleSheet";
import { defineStyleSheet, vfBase, vfTheme } from "@/viewfly-antd/style/base.style";
import { useCssSizeDefine, useDisabled } from "@/viewfly-antd/style/cssHooks";

export const radioStyle = defineStyleSheet('radio', () => {
    const { s, define, className } = useStyleSheetContext();
    const sizeClassNames = useCssSizeDefine();
    const radio = className()
    const group = className('group')
    const button = className('button')
    const checked = className('checked')
    const outline = className('outline')
    const solid = className('solid')
    const { disabled } = useDisabled()

    const input = className('input')

    define(s(input), {
        position: 'absolute',
        [s('input')]: {
            opacity: 0,
            pointerEvents: 'none'
        }
    })

    define(s(radio), {
        position: 'relative',
        [s(`&${button}`)]: {
            border: vfBase.border,
            display: 'inline-block',
            cursor: 'pointer'
        }
    })

    define(s(group), {
        width: '100%',
        [s(`&>${button}:not(:last-child)`)]: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            marginRight: -1
        },
        [s(`&>${button}:not(:first-child)`)]: {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
        },
        [s(`&${outline}`)]: {
            [s(`&>${button}${checked}`)]: {
                color: vfTheme.primaryColor,
                borderColor: vfTheme.primaryColor,
            },
            [s(`&>${button}.active`)]: {
                color: vfTheme.primaryColor,
                borderColor: vfTheme.primaryColor,
            },
            [s(`&>${button}:not(${disabled}):hover`)]: {
                color: vfTheme.primaryColorHover,
            },
        }
    })

    return { ...sizeClassNames, input, group, button, radio, solid, outline, checked, disabled }
})