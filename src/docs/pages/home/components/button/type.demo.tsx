

import { Button, FC, Space, DisabledProvide } from "@antd/viewfly/ui"
import { useSignal } from "@viewfly/core";
/**
 * @label 按钮类型
 * @content 按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
 */
const App: FC = () => {
    return () => {
        return (
            <Space wrap>
                <Button type="primary" >Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
                <Button type="text" >Text Button</Button>
                <Button type="link">Link Button</Button>
            </Space>
        )
    }
}
export default App;
