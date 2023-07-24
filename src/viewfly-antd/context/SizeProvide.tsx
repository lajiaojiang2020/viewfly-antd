import { inject, onPropsChanged, provide, Signal, useSignal } from "@viewfly/core"
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

export const useSize = (value?: SizeType) => {
    const sizeController = useSignal(value)
    return inject(SizeToken, sizeController)
}