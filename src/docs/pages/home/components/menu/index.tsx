
import { DemoCard } from "@/docs/components/DemoCard"
import { DemoPage } from "@/docs/components/DemoPage"
import { FC } from "@antd/viewfly/ui"
/**
 * @group 导航
 * @groupIndex 3
 * @title Menu
 * @subtitle 菜单
 * @orderIndex 4
 */
const MenuPage: FC = () => {
    return () => {
        return (
            <DemoPage>
                <h2>Menu 菜单</h2>
                <DemoCard id='home.components.menu.inline.demo' />
            </DemoPage>
        )
    }
}


export default MenuPage
