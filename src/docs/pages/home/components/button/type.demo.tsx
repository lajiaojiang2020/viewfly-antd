

import { Button, FC, Space, DisabledProvide } from "@antd/viewfly/ui"
import { useSignal } from "@viewfly/core";
/**
 * @label 按钮类型
 * @content 按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
 */
const App: FC = () => {
    const value = useSignal(false);



    return () => {
        console.log(value())
        return (

            <Space wrap>
                <DisabledProvide value={value()}>
                    <Button type="primary" >Primary Button</Button>
                    <Button>Default Button</Button>
                    <Button type="dashed">Dashed Button</Button>

                </DisabledProvide>
                <DisabledProvide value={false}>
                    <Button type="text" onClick={() => value.set(!value())}>Text Button</Button>
                    <Button type="link">Link Button</Button>
                </DisabledProvide>


            </Space>
        )
    }
}
export default App;
