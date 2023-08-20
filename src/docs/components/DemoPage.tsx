import { defineStyleSheet, FC, JSXNode, useStyleSheetContext, vfBase, vfColor } from "@antd/viewfly/ui"
import { router } from "../router"
import ApiTables from '@/docs/@api'


export interface DemoPageProps {
    children?: JSXNode
}
export const DemoPage: FC<DemoPageProps> = (props) => {
    const path = router.active as keyof typeof ApiTables;
    const apiTable = (ApiTables[path]) as any[];
    return () => {
        const { children } = props;
        return (
            <div style={{ width: '100%' }}>
                {children}
                {apiTable && (
                    <Markdown>
                        <h1>API</h1>
                        {apiTable.map(table => (
                            <AipTable table={table} />
                        ))}
                    </Markdown>
                )}
            </div>
        )
    }
}
interface Table {
    name: string
    data: Column[]

}

interface Column {
    name: string
    description: string
    type: string
    isOptional?: boolean
    defaultValue: string
}

interface Th {
    title: string
    key: keyof Column
    reader?: (v: any) => string
}
export const AipTable: FC<{ table: Table }> = ({ table }) => {
    const cols: Th[] = [
        { title: '参数', key: 'name' },
        { title: '说明', key: 'description' },
        { title: '类型', key: 'type' },
        { title: '默认值', key: 'defaultValue' },
        { title: '可选', key: 'isOptional', reader: v => v ? '是' : '否' },
    ]
    return () => (
        <>
            <h2>{table.name}</h2>
            <table>
                <thead>
                    <tr>
                        {cols.map(item => (
                            <th>{item.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {table.data.map(d => (
                        <tr>
                            {cols.map(item => (
                                <td>{item.reader ? item.reader(d[item.key]) : d[item.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export const Markdown: FC<{ children?: JSXNode }> = ({ children }) => {
    return () => <div class={styles.markdown}>{children}</div>
}

const styles = defineStyleSheet('demo-markdown', () => {
    const { className, define, s } = useStyleSheetContext();
    const markdown = className();
    define(s(markdown), {
        fontSize: 14,
        lineHeight: 2,
        [s('h1')]: {
            marginBottom: '0.5em',
            color: 'rgba(0, 0, 0, 0.88)',
            [s('&>span:nth-child(1)')]: {
                fontWeight: 400,
            },
            [s('&>span:nth-child(2)')]: {
                fontWeight: 'bold',
                marginLeft: 15
            }
        },
        [s('h2,h3,h4,h5,h6')]: {
            margin: '1.6em 0 0.6em',
            color: 'rgba(0, 0, 0, 0.88)',
            fontWeight: 500
        },
        [s('p')]: {
            margin: '1em 0px',
            color: 'rgba(0, 0, 0, 0.88)',
        },
        [s('ul>li')]: {
            marginLeft: 20,
            paddingLeft: 4,
            listStyleType: 'circle',
            color: 'rgba(0, 0, 0, 0.88)',
        },
        [s('table')]: {
            width: '100%',
            border: vfBase.border,
            fontSize: 13,
            fontFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
            lineHeight: 1.57,
            borderSpacing: 0,
            borderCollapse: 'collapse',
            [s('td,th')]: {
                padding: '12px 24px',
                textAlign: 'left'
            },
            [s('thead>tr>th')]: {
                borderBottom: vfBase.border,
                backgroundColor: vfColor.hoverBackground
            },
            [s('tbody>tr:not(last-child)')]: {
                borderBottom: vfBase.border
            },
            [s('tr>td:not(last-child),tr>th:not(last-child)')]: {
                borderRight: vfBase.border
            }
        }
    })

    return { markdown }
})