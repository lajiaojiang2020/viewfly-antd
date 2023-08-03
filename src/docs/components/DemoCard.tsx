
import { defineStyleSheet, vfBase, vfColor, vfTheme, FC, useStyleSheetContext } from "@antd/viewfly/ui"
import demoMap from '@/docs/@demo'
import demoComponent from '@/docs/@demo/components'
import { CodeView } from "./CodeView"
import { useSignal } from "@viewfly/core"


export interface DemoCardProps {
    id: keyof typeof demoMap
}
export const DemoCard: FC<DemoCardProps> = (props) => {
    const show = useSignal(false)
    return () => {
        const data = demoMap[props.id];
        const Component = (demoComponent as any)[props.id]
        const showValue = show();
        return (
            <div class={styles.card}>
                <div class={styles.content} style={{ paddingBottom: 20 + 'px' }}>
                    <Component />
                </div>
                <div class={styles.content} style={{ paddingTop: 20 + 'px' }}>
                    <div class={styles.label}>{data.label}</div>
                    <div>{data.content}</div>
                </div>
                <div class={styles.content} style={{ display: showValue ? 'block' : 'none' }}>
                    <CodeView code={data.code} />
                </div>
                <div class={styles.action} onClick={() => show.set(!showValue)}>{showValue ? '收起' : '展开'}</div>
            </div>
        )
    }
}

const styles = defineStyleSheet('demo-card', () => {
    const { className, define, s } = useStyleSheetContext();
    const card = className();
    const selected = className('selected');
    const content = className('content');
    const action = className('action');
    const label = className('label')

    define(s(card), {
        fontSize: 14,
        border: vfBase.border,
        backgroundColor: vfColor.baseBackground,
        transition: vfBase.transition,
        borderRadius: vfBase.borderRadius,
        marginBottom: 15,

        [s(`&${selected}`)]: {
            backgroundColor: vfTheme.primaryColor
        },
        [s(content)]: {
            padding: 15,
            color: vfColor.primaryText,
            width: '100%',
            position: 'relative',
            [s(`&:not(:first-child)`)]: {
                borderTop: vfBase.border
            }
        },
        [s(label)]: {
            position: 'absolute',
            left: 10,
            top: -12,
            height: 24,
            lineHeight: '25px',
            backgroundColor: vfColor.baseBackground,
            padding: '0px 5px'
        },
        [s(action)]: {
            height: 28,
            lineHeight: '28px',
            textAlign: 'center',
            cursor: 'pointer',
            borderTop: vfBase.border,
            width: '100%'
        }
    })
    return { card, selected, content, action, label }
})



