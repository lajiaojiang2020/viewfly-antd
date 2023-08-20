import { DefineSheet, useStyleSheetContext } from "../defineStyleSheet";
import { SizeType, Sizes, CSSDifineMap, ClassNameMap } from "../type";
import { vfSzie } from "./size.style";


const minWidth: Record<SizeType, string> = {
    small: "24px!important",
    middle: "32px!important",
    large: "40px!important",
    default: "32px!important"
}
/**  尺寸 */
export const useCssSizeDefine = () => {
    const { className, define, s } = useStyleSheetContext();
    const sizeClassName: ClassNameMap<SizeType> = {} as ClassNameMap<SizeType>
    const sizeStyle: CSSDifineMap = {};
    Sizes.forEach((type: SizeType) => {
        sizeClassName[type] = className(`size-${type}`);
        const styleType = type === 'default' ? 'middle' : type;
        sizeStyle[s(`&${sizeClassName[type]}`)] = {
            ...vfSzie[styleType],
            minWidth: minWidth[type]
        } as DefineSheet;
    });

    define(s(className()), sizeStyle)

    return sizeClassName
}

/** 禁用 */
export const useDisabled = () => {
    const { className, define, s } = useStyleSheetContext();
    const disabled = className('is-disabled')
    define(s(className()), {
        [s(`&${disabled}`)]: {
            pointerEvents: 'none',
            cursor: 'not-allowed',
            borderColor: '#d9d9d9',
            color: 'rgba(0,0,0,.25)',
            backgroundColor: 'rgba(0,0,0,.04)',
            boxShadow: 'none'
        }
    })
    return { disabled }
}