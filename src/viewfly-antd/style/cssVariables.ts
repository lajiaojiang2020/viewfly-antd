
import { generate } from '@ant-design/colors';
import { TinyColor } from '@ctrl/tinycolor';

export class Theme {
    public primaryColor = '#1677ff'
    public successColor = '#52c41a'
    public warningColor = '#faad14'
    public errorColor = '#ff4d4f'
    public infoColor = '#1890ff'
    constructor(opt: Partial<Theme>) {
        Object.assign(this, opt);
    }
}

export function getStyle(_theme: Partial<Theme> = {}): ColorVariables {
    const theme = new Theme(_theme)
    const variables: any = {};
    const formatColor = function formatColor(color: TinyColor, updater?: (c: TinyColor) => TinyColor) {
        let clone = color.clone();
        clone = updater ? updater(clone) : clone;
        return clone.toRgbString();
    };
    const fillColor = (colorVal: string, type: string) => {
        const baseColor = new TinyColor(colorVal);
        const colorPalettes = generate(baseColor.toRgbString());
        variables[`${type}Color`] = formatColor(baseColor);
        variables[`${type}ColorDisabled`] = colorPalettes[1];
        variables[`${type}ColorHover`] = colorPalettes[4];
        variables[`${type}ColorActive`] = colorPalettes[6];
        variables[`${type}ColorOutline`] = baseColor.clone().setAlpha(0.2).toRgbString();
        variables[`${type}ColorDeprecatedBg`] = colorPalettes[0];
        variables[`${type}ColorDeprecatedBorder`] = colorPalettes[2];
    };
    if (theme.primaryColor) {
        fillColor(theme.primaryColor, 'primary');
        const primaryColor = new TinyColor(theme.primaryColor);
        const primaryColors = generate(primaryColor.toRgbString());
        const primaryActiveColor = new TinyColor(primaryColors[0]);
        primaryColors.forEach((color, index) => variables[`primary_${index + 1}`] = color);
        variables['primaryColorDeprecated_L_35'] = formatColor(primaryColor, c => c.lighten(35));
        variables['primaryColorDeprecated_L_20'] = formatColor(primaryColor, c => c.lighten(20));
        variables['primaryColorDeprecated_T_20'] = formatColor(primaryColor, c => c.tint(20));
        variables['primaryColorDeprecated_T_50'] = formatColor(primaryColor, c => c.tint(50));
        variables['primaryColorDeprecated_F_12'] = formatColor(primaryColor, c => c.setAlpha(c.getAlpha() * 0.12));
        variables['primaryColorActiveDeprecated_F_30'] = formatColor(primaryActiveColor, c => c.setAlpha(c.getAlpha() * 0.3));
        variables['primaryColorActiveDeprecated_D_02'] = formatColor(primaryActiveColor, c => c.darken(2));
    }
    if (theme.successColor) {
        fillColor(theme.successColor, 'success');
    }
    if (theme.warningColor) {
        fillColor(theme.warningColor, 'warning');
    }
    if (theme.errorColor) {
        fillColor(theme.errorColor, 'error');
    }
    if (theme.infoColor) {
        fillColor(theme.infoColor, 'info');
    }
    return variables;
}


export interface ColorVariables {
    ['primaryColor']: string;
    ['primaryColorDisabled']: string;
    ['primaryColorHover']: string;
    ['primaryColorActive']: string;
    ['primaryColorOutline']: string;
    ['primaryColorDeprecatedBg']: string;
    ['primaryColorDeprecatedBorder']: string;
    ['primary_1']: string;
    ['primary_2']: string;
    ['primary_3']: string;
    ['primary_4']: string;
    ['primary_5']: string;
    ['primary_6']: string;
    ['primary_7']: string;
    ['primary_8']: string;
    ['primary_9']: string;
    ['primary_10']: string;
    ['primaryColorDeprecated_L_35']: string;
    ['primaryColorDeprecated_L_20']: string;
    ['primaryColorDeprecated_T_20']: string;
    ['primaryColorDeprecated_T_50']: string;
    ['primaryColorDeprecated_F_12']: string;
    ['primaryColorActiveDeprecated_F_30']: string;
    ['primaryColorActiveDeprecated_D_02']: string;
    ['successColor']: string;
    ['successColorDisabled']: string;
    ['successColorHover']: string;
    ['successColorActive']: string;
    ['successColorOutline']: string;
    ['successColorDeprecatedBg']: string;
    ['successColorDeprecatedBorder']: string;
    ['warningColor']: string;
    ['warningColorDisabled']: string;
    ['warningColorHover']: string;
    ['warningColorActive']: string;
    ['warningColorOutline']: string;
    ['warningColorDeprecatedBg']: string;
    ['warningColorDeprecatedBorder']: string;
    ['errorColor']: string;
    ['errorColorDisabled']: string;
    ['errorColorHover']: string;
    ['errorColorActive']: string;
    ['errorColorOutline']: string;
    ['errorColorDeprecatedBg']: string;
    ['errorColorDeprecatedBorder']: string;
    ['infoColor']: string;
    ['infoColorDisabled']: string;
    ['infoColorHover']: string;
    ['infoColorActive']: string;
    ['infoColorOutline']: string;
    ['infoColorDeprecatedBg']: string;
    ['infoColorDeprecatedBorder']: string;
}