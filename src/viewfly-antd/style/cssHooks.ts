import { StyleSheetMethod, DefineSheet } from "../defineStyleSheet";
import { SizeType, Sizes } from "../type";
import { vfSzie } from "./base.style";


/**  尺寸 */
export const useCssSizeDefine = ({ className, define, s }: StyleSheetMethod) => {
    const sizeClassName: Record<SizeType, string> = {} as Record<SizeType, string>;
    const sizeStyle: Record<number, DefineSheet> = {} as Record<number, DefineSheet>;
    Sizes.forEach((type: SizeType) => {
        sizeClassName[type] = className(`size-si-${type}`);
        sizeStyle[s(`&${sizeClassName[type]}`)] = {
            ...vfSzie[type]
        } as DefineSheet;
    });

    define(s(className()), sizeStyle)

    return sizeClassName
}