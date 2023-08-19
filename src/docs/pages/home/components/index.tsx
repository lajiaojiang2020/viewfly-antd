import { defineStyleSheet, vfBase, FC, JSXNode, useStyleSheetContext, Menu, MenuItem, ScrollView } from "@antd/viewfly/ui"
import menus from '@/docs/@menu'
import { router } from "@/docs/router";


/** 升序 */
function sortByAsc<T>(sortField: keyof T) {
    return (a: T, b: T) => {
        const x = Number(sortField ? a[sortField] : a);
        const y = Number(sortField ? b[sortField] : b);
        return x - y;
    }
}

interface DataVo extends Omit<MenuItem, 'children'> {
    groupIndex?: any
    orderIndex?: any
    children?: DataVo[]
}
const ComponentLayout: FC<{ children?: JSXNode }> = (props) => {
    const map: Record<string, DataVo> = {};
    const group: DataVo[] = [];
    menus.forEach((item) => {
        item.groupIndex = item.groupIndex || '0';
        if (!map[item.group]) {
            map[item.group] = { title: item.group, type: 'group', orderIndex: item.groupIndex, children: [] } as DataVo;
        }
        else {
            map[item.group].orderIndex = Number(item.groupIndex) + Number(map[item.group].orderIndex);
        }
        map[item.group].children!.push(item);
    });
    for (let i in map) {
        const _group = map[i];
        _group.children = _group.children?.sort(sortByAsc('orderIndex'));
        group.push(_group);
    }
    const items = group.sort(sortByAsc('orderIndex'));


    const handleClick = (item: MenuItem) => {
        if (item.path) {
            router.push(item.path)
        }
    }

    return () => {
        return (
            <div class={styles.layout}>
                <div class={styles.menu}>
                    <ScrollView style={{ height: '100%' }}>
                        <Menu items={items} onClick={handleClick} />
                    </ScrollView>
                </div>
                <div class={styles.body}>
                    <ScrollView style={{ height: '100%' }}>
                        <div class={styles.bodyView}>
                            {props.children}
                        </div>
                    </ScrollView>
                </div>
                <div class={styles.affix}>

                </div>
            </div>
        )
    }
}

const styles = defineStyleSheet('component-layout', () => {
    const { className, define, s } = useStyleSheetContext()
    const layout = className();
    const menu = className('menu');
    const affix = className('affix')
    const body = className('body');
    const bodyView = className('body-view');

    define(s(layout), {
        display: 'flex',
        height: '100%',
        position: 'relative',
        [s(menu)]: {
            minWidth: 260,
            height: '100%',
            borderRight: vfBase.border,
        },
        [s(body)]: {
            flex: 1,
            [s(bodyView)]: {
                padding: '35px 150px 35px 50px'
            }
        },
        [s(affix)]: {
            position: 'absolute',
            top: 35,
            right: 0,
            height: '100%',
            borderLeft: vfBase.border
        },
    })
    return { layout, menu, affix, body, bodyView }
})


export default ComponentLayout


