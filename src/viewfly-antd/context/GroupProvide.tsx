import { inject, provide, Signal, useSignal } from "@viewfly/core"
import { InjectionToken, useEffect } from "@viewfly/core"
import { FC } from "../type"


const GroupToken = new InjectionToken<Signal<any>>('GroupToken')

export interface GroupProvideProps<T = any> {
    onChange?: (value: T) => any
    value?: T
    children?: any
}
export const GroupProvide: FC<GroupProvideProps> = (props) => {
    const value = useSignal(props.value)

    useEffect(value, () => {
        props.onChange?.(value())
    })

    provide({
        provide: GroupToken,
        useValue: value
    });

    return () => props.children
}
/** 获取 尺寸小 上下文  */
export const useGroup = (value?: any) => {
    const val = useSignal(value)
    return inject(GroupToken, val)
}


