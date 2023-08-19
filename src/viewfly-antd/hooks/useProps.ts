import { onPropsChanged, useSignal, Props } from "@viewfly/core"

export const useProps = <T extends Props, R>(props: T, get: (props: T) => R, defaultValue?: R) => {
    const value = useSignal(get(props) ?? defaultValue);

    onPropsChanged<T>((p1, p2) => {
        const newValue = get(p1 as T)
        if (newValue !== get(p2 as T)) {
            value.set(newValue)
        }
    });

    return value
}