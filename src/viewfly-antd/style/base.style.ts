import { createStyleSheet, useStyleSheetContext } from "../defineStyleSheet";
import { getStyle, Theme } from "./cssVariables";

export const { variable, defineStyleSheet } = createStyleSheet('vf');
export const vfTheme = variable(getStyle())
export const vfColor = variable({
    textColor: '#F000000e0',
    primaryText: "rgba(0,0,0,0.88)",
    regularText: "#606266",
    secondaryText: "#909399",
    placeholderText: "#A8ABB2",
    disabledText: "rgba(0,0,0,.45)",
    darkerBorder: "#CDD0D6",
    darkBorder: "#D4D7DE",
    baseBorder: "#d9d9d9",
    lightBorder: "#E4E7ED",
    lighterBorder: "#EBEEF5",
    extraLightBorder: "#F2F6FC",
    darkerFill: "#E6E8EB",
    darkFill: "#EBEDF0",
    baseFill: "#F0F2F5",
    lightFill: "#F5F7FA",
    lighterFill: "#FAFAFA",
    wxtraLightFill: "#FAFCFF",
    blankFill: "#FFFFFF",
    basicBlack: "#000000",
    basicWhite: "#FFFFFF",
    transparent: "Transparent",
    pageBackground: "#F2F3F5",
    baseBackground: "#FFFFFF",
    overlayBackground: "rgba(0,0,0,.02)",
    hoverBackground: 'rgba(0, 0, 0, .06)',
    activeBackground: 'rgba(0, 0, 0, .15)'
})
export const vfBase = variable({
    transition: 'all .3s cubic-bezier(.645,.045,.355,1)',
    transparentBorder: '1px solid transparent',
    border: '1px solid rgba(5, 5, 5, 0.06)',
    fontWeight: '400',
    boxShadow: '0 2px #00000004',
    fontSize: '14px',
    borderRadius: '6px',
    baseRadius: '1px'
});
export const formItemStyle = {
    position: 'relative',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    transition: 'all .3s cubic-bezier(.645,.045,.355,1)',
}

defineStyleSheet('', () => {
    const { define, s } = useStyleSheetContext();
    define(s('body,html'), {
        fontSize: 14,
        color: vfColor.textColor
    })
    define(s('*'), {
        margin: '0px',
        padding: '0px',
        boxSizing: 'border-box',
    })
})

/** 注册主题 */
export const registerTheme = (theme?: Partial<Theme>) => {
    variable(getStyle(theme));
}



