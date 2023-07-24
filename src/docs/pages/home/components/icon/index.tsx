
import * as Icons from "@antd/viewfly/icon"
import { DemoPage } from "@/docs/components/DemoPage"
import { defineStyleSheet, vfBase, vfTheme, FC } from "@antd/viewfly/ui"



/**
 * @group 通用
 * @title Icon
 * @subtitle 图标
 * @orderIndex 1
 */
const IconPage: FC = () => {
    return () => {
        return (
            <DemoPage>
                <h2>Icon 图标</h2>
                <div class={styles.iconPage}>
                    {Object.entries(Icons).map(([name, Component]) => (
                        <div class={styles.item} key={name}>
                            <div>
                                <Component class={styles.icon} />
                                <div>{name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </DemoPage>
        )
    }
}

const styles = defineStyleSheet('icon-page', ({ className, define, s }) => {
    const iconPage = className();
    const item = className('item')
    const icon = className('icon')

    define(s(iconPage), {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',
        padding: '50px 0px',
        color: '#555',
        fontSize: 14,
        [s(item)]: {
            width: '16.666%',
            height: 100,
            marginBottom: 10,
            display: 'flex',
            borderRadius: 8,
            transition: vfBase.transition,
            cursor: 'pointer',
            [s('&:hover')]: {
                color: '#fff',
                backgroundColor: vfTheme.primaryColor,
                [s(icon)]: {
                    transform: 'scale(1.5)'
                }
            },
            [s('>div')]: {
                margin: 'auto'
            }
        },
        [s(icon)]: {
            fontSize: 34,
            marginBottom: 5,
            transition: vfBase.transition,
        }
    });

    return { iconPage, icon, item }
})

export default IconPage