import { defineStyleSheet, vfBase, vfSize, vfColor, vfTheme } from "../../style/base.style";
import { ButtonShape, ButtonType } from "./Button";
import { DefineSheet } from '../../defineStyleSheet'
import { SizeType } from "@/viewfly-antd/type";
const ButtonTypes: ButtonType[] = ["default", "primary", "ghost", "dashed", "link", "text"];
const ButtonShapes: ButtonShape[] = ["default", "circle", "round"];
const ButtonSizes: SizeType[] = ['small', 'middle', 'large'];

export const btnStyles = defineStyleSheet('button', ({ className, define, s }) => {
    const button = className();
    const icon = className('icon');
    const onlyIcon = className('only-icon')
    const danger = className('is-danger')
    const disabled = className('is-disabled')
    const typesClassName: Record<ButtonType, string> = {} as Record<ButtonType, string>;
    const typesSelector: Record<ButtonType, number> = {} as Record<ButtonType, number>;
    const shapeClassName: Record<ButtonShape, string> = {} as Record<ButtonShape, string>;
    const shapeSelector: Record<ButtonShape, number> = {} as Record<ButtonShape, number>;
    const sizeClassName: Record<SizeType, string> = {} as Record<SizeType, string>;
    const sizeSelector: Record<SizeType, number> = {} as Record<SizeType, number>;

    ButtonTypes.forEach((type: ButtonType) => {
        typesClassName[type] = className(`is-${type}`);
        typesSelector[type] = s(`&${typesClassName[type]}`)
    });
    ButtonShapes.forEach((type: ButtonShape) => {
        shapeClassName[type] = className(`shape-si-${type}`);
        shapeSelector[type] = s(`&${shapeClassName[type]}`)
    });
    ButtonSizes.forEach((type: SizeType) => {
        sizeClassName[type] = className(`size-si-${type}`);
        sizeSelector[type] = s(`&${sizeClassName[type]}`)
    });

    const commStyle: DefineSheet = {
        boxShadow: vfBase.boxShadow,
        [s(`&:hover`)]: {
            color: vfTheme.primaryColorHover,
            borderColor: vfTheme.primaryColorHover
        },
        [s(`&:active`)]: {
            color: vfTheme.primaryColorActive,
            borderColor: vfTheme.primaryColorActive
        },
        [s(`&${danger}`)]: {
            color: vfTheme.errorColor,
            borderColor: vfTheme.errorColor,
            [s(`&:hover`)]: {
                color: vfTheme.errorColorHover,
                borderColor: vfTheme.errorColorHover
            },
            [s(`&:active`)]: {
                color: vfTheme.errorColorActive,
                borderColor: vfTheme.errorColorActive
            },
        },

    }

    define(s(button), {
        lineHeight: '24px',
        height: 32,
        padding: '4px 15px',
        position: 'relative',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        backgroundImage: 'none',
        cursor: 'pointer',
        userSelect: 'none',
        touchAction: 'manipulation',
        fontWeight: vfBase.fontWeight,
        border: vfBase.transparentBorder,
        transition: vfBase.transition,
        fontSize: vfSize.fontSize,
        borderRadius: vfSize.borderRadius,
        color: vfColor.primaryText,
        background: vfColor.baseBackground,

        [s(`&${disabled}`)]: {
            pointerEvents: 'none',
            cursor: 'not-allowed',
            borderColor: '#d9d9d9',
            color: 'rgba(0,0,0,.25)',
            backgroundColor: 'rgba(0,0,0,.04)',
            boxShadow: 'none'
        },

        [s('>span')]: {
            display: 'inline-block'
        },

        [s(`&:not(${disabled})`)]: {

            [typesSelector.primary]: {
                color: vfColor.basicWhite,
                backgroundColor: vfTheme.primaryColor,

                [s(`&:hover`)]: {
                    color: vfColor.basicWhite,
                    backgroundColor: vfTheme.primaryColorHover
                },

                [s(`&:active`)]: {
                    color: vfColor.basicWhite,
                    backgroundColor: vfTheme.primaryColorActive
                },

                [s(`&${danger}`)]: {
                    backgroundColor: vfTheme.errorColor,
                    boxShadow: '0 2px 0 rgba(255,38,5,.06)',
                    [s(`&:hover`)]: {
                        color: vfColor.basicWhite,
                        backgroundColor: vfTheme.errorColorHover
                    },

                    [s(`&:active`)]: {
                        color: vfColor.basicWhite,
                        backgroundColor: vfTheme.errorColorActive
                    },
                },
            },

            [typesSelector.default]: {
                borderColor: vfColor.baseBorder,
                ...commStyle

            },

            [typesSelector.dashed]: {
                borderColor: vfColor.baseBorder,
                borderStyle: 'dashed',
                ...commStyle
            },

            [typesSelector.text]: {
                [s(`&:not(${disabled})`)]: {

                    [s(`&:hover`)]: {
                        backgroundColor: vfColor.hoverBackground
                    },
                    [s(`&:active`)]: {
                        backgroundColor: vfColor.activeBackground
                    },

                    [s(`&${danger}`)]: {
                        color: vfTheme.errorColor,
                        [s(`&:hover`)]: {
                            backgroundColor: vfTheme.errorColorDeprecatedBg
                        }
                    },
                }

            },

            [typesSelector.link]: {
                color: vfTheme.primaryColor,
                [s(`&:hover`)]: {
                    color: vfTheme.primaryColorHover
                },

                [s(`&:active`)]: {
                    color: vfTheme.primaryColorActive
                },

                [s(`&${danger}`)]: {
                    color: vfTheme.errorColor,
                    [s(`&:hover`)]: {
                        color: vfTheme.errorColorHover
                    },
                    [s(`&:active`)]: {
                        color: vfTheme.errorColorActive
                    },
                },
            },

            [s(`&:focus-visible`)]: {
                outline: '4px solid #91caff',
                outlineOffset: '1px',
                transition: 'outline-offset 0s, outline 0s'
            }
        },

        [shapeSelector.circle]: {
            minWidth: 32,
            paddingInlineStart: 0,
            paddingInlineEnd: 0,
            borderRadius: '50%'
        },


        [s(`&${onlyIcon}`)]: {
            fontSize: 16
        },
        [s(icon)]: {
            lineHeight: 0,
        },
        [s(`&:not(${onlyIcon}) ${icon}`)]: {
            marginInlineEnd: 8
        }
    })
    return { button, icon, danger, onlyIcon, disabled, type: typesClassName, ...shapeClassName }
})
