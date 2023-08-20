import { formItemStyle, variable, vfBase } from "./base.style";

const createSize = () => {
    return {
        small: variable({
            fontSize: '12px',
            lineHeight: '24px',
            height: '24px',
            padding: '0px 7px',
            borderRadius: `calc(${vfBase.baseRadius} * 6 )`,
            ...formItemStyle
        }, 'size-small'),
        middle: variable({
            fontSize: '14px',
            lineHeight: '32px',
            height: '32px',
            padding: '0px 15px',
            borderRadius: `calc(${vfBase.baseRadius} * 6 )`,
            ...formItemStyle,

        }, 'size-middle'),
        large: variable({
            fontSize: '16px',
            lineHeight: '40px',
            height: '40px',
            padding: '0px 15px',
            borderRadius: `calc(${vfBase.baseRadius} * 6 )`,
            ...formItemStyle,
        }, 'size-large'),
    }
}

export const vfSzie = createSize();