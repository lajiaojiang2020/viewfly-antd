
type ClassNames = Array<boolean | string | null | undefined | any[]>

export const cls = (...arr: ClassNames) => {
    return arr.flat(Infinity).filter(item => !!item) as string[]
}