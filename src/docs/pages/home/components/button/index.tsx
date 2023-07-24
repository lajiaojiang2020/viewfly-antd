
import { DemoCard } from "@/docs/components/DemoCard"
import { DemoPage } from "@/docs/components/DemoPage"
import { FC } from "@antd/viewfly/ui"
/**
 * @group 通用
 * @groupIndex 1
 * @title Button
 * @subtitle 按钮
 * @orderIndex 0
 */
const ButtonPage: FC = () => {
    return () => {
        return (
            <DemoPage>
                <h2>Button 按钮</h2>
                <DemoCard id='home.components.button.type.demo' />
                <DemoCard id='home.components.button.icon.demo' />
                <DemoCard id='home.components.button.disabled.demo' />

            </DemoPage>
        )
    }
}


export default ButtonPage
