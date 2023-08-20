
import { DemoCard, DemoCardGroup } from "@/docs/components/DemoCard"
import { DemoPage, Markdown } from "@/docs/components/DemoPage"
import { FC } from "@antd/viewfly/ui"
/**
 * @group 通用
 * @groupIndex 1
 * @title Button
 * @label 按钮
 * @orderIndex 0
 */
const ButtonPage: FC = () => {
    return () => {
        return (
            <DemoPage>
                <Markdown>
                    <h1>
                        <span>Button</span><span>按钮</span>
                    </h1>
                    <p>按钮用于开始一个即时操作。</p>
                    <h2>何时使用</h2>
                    <p>标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。</p>
                    <p>在 Ant Design 中我们提供了五种按钮。</p>
                    <ul>
                        <li>主按钮：用于主行动点，一个操作区域只能有一个主按钮。</li>
                        <li>默认按钮：用于没有主次之分的一组行动点。</li>
                        <li>虚线按钮：常用于添加操作。</li>
                        <li>文本按钮：用于最次级的行动点。</li>
                        <li>链接按钮：一般用于链接，即导航至某位置。</li>
                    </ul>
                    <p>以及四种状态属性与上面配合使用。</p>
                    <ul>
                        <li>危险：删除/移动/修改权限等危险操作，一般需要二次确认。</li>
                        <li>幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。</li>
                        <li>禁用：行动点不可用的时候，一般需要文案解释。</li>
                        <li>加载中：用于异步操作等待反馈的时候，也可以避免多次提交。</li>
                    </ul>
                    <p>
                        <a href="https://ant.design/docs/spec/buttons-cn">完整设计指南</a>
                    </p>
                    <h2>代码演示</h2>
                </Markdown>
                <DemoCardGroup >
                    <DemoCard id='home.components.button.demo.type' />
                    <DemoCard id='home.components.button.demo.icon' />
                    <DemoCard id='home.components.button.demo.size' />
                    <DemoCard id='home.components.button.demo.disabled' />
                </DemoCardGroup>


            </DemoPage>
        )
    }
}


export default ButtonPage
