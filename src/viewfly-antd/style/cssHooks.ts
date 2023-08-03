import { DefineSheet, useStyleSheetContext } from "../defineStyleSheet";
import { SizeType, Sizes, CSSDifineMap, ClassNameMap } from "../type";
import { vfSzie } from "./size.style";



/**  尺寸 */
export const useCssSizeDefine = () => {
    const { className, define, s } = useStyleSheetContext();
    const sizeClassName: ClassNameMap<SizeType> = {} as ClassNameMap<SizeType>
    const sizeStyle: CSSDifineMap = {};
    Sizes.forEach((type: SizeType) => {
        sizeClassName[type] = className(`size-${type}`);
        sizeStyle[s(`&${sizeClassName[type]}`)] = {
            ...vfSzie[type]
        } as DefineSheet;
    });

    define(s(className()), sizeStyle)

    return sizeClassName
}