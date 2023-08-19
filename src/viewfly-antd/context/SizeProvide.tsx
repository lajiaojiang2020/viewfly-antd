import { inject, onPropsChanged, provide, Signal, useDerived, useSignal } from "@viewfly/core"
import { InjectionToken } from "@viewfly/core"
import { FC, JSXNode, SizeType } from "../type"


const SizeToken = new InjectionToken<Signal<SizeType>>('SizeToken')
export interface SizeProps {
    children?: JSXNode
    value: SizeType
}
export const SizeProvide: FC<SizeProps> = (props) => {
    const sizeController = useSignal(props.value)

    provide({
        provide: SizeToken,
        useValue: sizeController
    });

    onPropsChanged<SizeProps>((p1, p2) => {
        if (p1?.value !== p2?.value) {
            sizeController.set(p1?.value as SizeType)
        }
    })

    return () => props.children
}
/** 获取 尺寸小 上下文  */
export const useSize = (value?: SizeType) => {
    const sizeController = useSignal(value)
    return inject(SizeToken, sizeController)
}

/** 获取 尺寸小 上下文 优先使用组件属性 */
export const useSizeWithProps = (props: any, value?: SizeType) => {
    const sizeController = useSignal<SizeType | undefined>(props.size || value);
    const context = inject(SizeToken, sizeController)
    return useDerived<SizeType>(() => props.size ?? context() ?? value)
}