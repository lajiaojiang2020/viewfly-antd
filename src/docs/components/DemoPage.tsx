import { FC, JSXNode } from "@antd/viewfly/ui"

export interface DemoPageProps {
    children?: JSXNode
}
export const DemoPage: FC<DemoPageProps> = (props) => {

    return () => {
        return (
            <div style={{ width: '100%' }}>
                <div></div>
                <div>{props.children}</div>
            </div>
        )
    }
}