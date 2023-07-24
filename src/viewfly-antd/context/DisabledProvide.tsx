import { inject, onPropsChanged, provide, Signal, useSignal } from "@viewfly/core"
import { InjectionToken } from "@viewfly/core"
import { FC, JSXNode } from "../type"


const DisabledToken = new InjectionToken<Signal<boolean>>('DisabledToken')
export interface DisabledProps {
    children?: JSXNode
    value: boolean
}
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

export const useDisabled = (value?: boolean) => {
    const disableController = useSignal(value)
    return inject(DisabledToken, disableController)
}