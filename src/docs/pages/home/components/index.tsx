


import { defineStyleSheet, vfBase, FC, JSXNode } from "@antd/viewfly/ui"

const ComponentLayout: FC<{ children?: JSXNode }> = (props) => {
    return () => {
        return (
            <div class={styles.layout}>
                <div class={styles.menu}></div>
                <div class={styles.body}>
                    {props.children}
                </div>
                <div class={styles.affix}>

                </div>
            </div>
        )
    }
}

const styles = defineStyleSheet('component-layout', ({ className, define, s }) => {
    const layout = className();
    const menu = className('menu');
    const affix = className('affix')
    const body = className('body');

    define(s(layout), {
        display: 'flex',
        [s(menu)]: {
            minWidth: 260,
            height: 'max-content',
            borderRight: vfBase.border
        },
        [s(body)]: {
            flex: 1,
            padding: '32px 50px'
        },
        [s(affix)]: {
            minWidth: 150,
            height: 'max-content',
            borderLeft: vfBase.border
        },
    })
    return { layout, menu, affix, body }
})


export default ComponentLayout


