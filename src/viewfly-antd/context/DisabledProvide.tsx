import { inject, onPropsChanged, provide, Signal, useSignal, useDerived } from "@viewfly/core"
import { InjectionToken } from "@viewfly/core"
import { FC, JSXNode } from "../type"


const DisabledToken = new InjectionToken<Signal<boolean>>('DisabledToken')
export interface DisabledProps {
    children?: JSXNode
    value: boolean | undefined
}
/** 注入 禁用状态 上下文 */
export const DisabledProvide: FC<DisabledProps> = (props) => {
    const disableController = useSignal(props.value)

    provide({
        provide: DisabledToken,
        useValue: disableController
    });

    onPropsChanged<DisabledProps>((p1, p2) => {
        if (p1?.value !== p2?.value) {
            disableController.set(p1?.value as boolean)
        }
    })

    return () => props.children
}
/** 获取 禁用状态 上下文 */
export const useDisabled = (value?: boolean) => {
    const disableController = useSignal(value)
    return inject(DisabledToken, disableController)
}
/** 获取 禁用状态 上下文 优先使用组件属性 */
export const useDisabledWithProps = (props: any, value?: boolean) => {
    const disableController = useSignal<boolean | undefined>(props.disabled || value);
    const context = inject(DisabledToken, disableController)
    return useDerived<boolean>(() => props.disabled ?? context() ?? value)
}