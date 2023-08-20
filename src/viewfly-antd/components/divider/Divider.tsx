import { DefineSheet, defineStyleSheet, FC, useStyleSheetContext, vfBase, vfColor } from "@antd/viewfly/ui"
import { HTMLAttributes } from "@viewfly/platform-browser";


/**
 * @api
 */
export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
    type?: 'horizontal' | 'vertical';
    orientation?: 'left' | 'right' | 'center';
    orientationMargin?: string | number;
    dashed?: boolean;
    plain?: boolean;
}
/** 分割线  */
export const Divider: FC<DividerProps> = (_props) => {
    return () => {
        const {
            type = 'horizontal',
            orientation = 'center',
            orientationMargin,
            dashed,
            plain,
            class: _className,
            children,
            ...props
        } = _props;

        const className = [
            _className,
            styles.divider,
            styles[type!],
            plain && styles.plain,
            children && styles.hasLabel,
            styles[orientation!]
        ]
        return (
            <div {...props} class={className}>
                {children && <span class={styles.label}>{children}</span>}
            </div>
        )
    }
}


const styles = defineStyleSheet('divider', () => {
    const { s, define, className } = useStyleSheetContext();
    const divider = className();
    const horizontal = className('horizontal')
    const vertical = className('vertical');
    const label = className('label')
    const plain = className('plain')
    const hasLabel = className('has-label')
    const left = className('orientation-left')
    const right = className('orientation-right')
    const center = className('orientation-center')

    const hasLabelStyle: DefineSheet = {
        position: 'relative',
        width: '50%',
        borderBlockStart: '1px solid transparent',
        borderBlockStartColor: 'inherit',
        borderBlockEnd: 0,
        transform: 'translateY(50%)',
        content: ''
    }

    define(s(divider), {
        fontSize: 14,
        lineHeight: 1.57,
        listStyle: 'none',
        borderBlockStart: vfBase.border,
        [s(`&${hasLabel}`)]: {
            display: 'flex',
            alignItems: 'center',
            margin: '16px 0',
            color: vfColor.textColor,
            fontWeight: 500,
            fontSize: 16,
            whiteSpace: 'nowrap',
            textAlign: 'center',
            borderBlockStart: '0 rgba(5, 5, 5, 0.06)',
            [s('&:before')]: hasLabelStyle,
            [s('&:after')]: hasLabelStyle,
            [s(`&${left}:before`)]: {
                width: '5%'
            },
            [s(`&${left}:after`)]: {
                width: '95%'
            },
            [s(`&${right}:before`)]: {
                width: '95%'
            },
            [s(`&${right}:after`)]: {
                width: '5%'
            },
        },
        [s(`&${horizontal}`)]: {
            display: 'flex',
            clear: 'both',
            width: '100%',
            minWidth: '100%',
            margin: '24px 0',
        },
        [s(`&${plain}`)]: {
            color: vfColor.textColor,
            fontWeight: 'normal',
            fontSize: 14
        },
        [s(label)]: {
            display: 'inline-block',
            padding: '0 1em'
        },
    })

    return { divider, horizontal, vertical, label, plain, hasLabel, left, right, center }
})