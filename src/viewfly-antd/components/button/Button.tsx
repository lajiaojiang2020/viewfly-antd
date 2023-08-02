import { useDisabled } from "@/viewfly-antd/context/DisabledProvide";
import { useSize } from "@/viewfly-antd/context/SizeProvide";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties } from "@viewfly/platform-browser";
import { EventHandle, FC, JSXNode, SizeType } from "../../type";
import { btnStyles } from "./Button.style";




export type ButtonType = "default" | "primary" | "ghost" | "dashed" | "link" | "text";
export type ButtonShape = "default" | "circle" | "round";
export type ButtonHTMLType = ButtonHTMLAttributes<HTMLButtonElement>['type'];
export type LegacyButtonType = ButtonType | 'danger';



export interface BaseButtonProps {
    /** 类型 
     * @default default
     */
    type?: ButtonType;
    /** 图标 */
    icon?: JSXNode;
    /** 形状 */
    shape?: ButtonShape;
    /** 大小 
     * @default middle
    */
    size?: SizeType;
    /** 是否禁用
     * @default false
     */
    disabled?: boolean;
    /** 加载 */
    loading?: boolean | {
        delay?: number;
    };
    /** 类 */
    class?: string;
    /** 样式 */
    style?: CSSProperties
    /** 幽灵 */
    ghost?: boolean;
    /** 危险的按钮 */
    danger?: boolean;
    /** 块级按钮 */
    block?: boolean;
    /** 子集 */
    children?: JSXNode;
}
export interface AnchorButtonProps extends Omit<AnchorHTMLAttributes<any>, 'type' | 'onClick'> {
    href?: string;
    target?: string;
    onClick?: EventHandle<MouseEvent>;
}
export interface NativeButtonProps extends Omit<ButtonHTMLAttributes<any>, 'type' | 'onClick'> {
    htmlType?: ButtonHTMLType;
    onClick?: EventHandle<MouseEvent>;
}


/** 按钮属性
 * @api
 */
export interface ButtonProps extends BaseButtonProps, AnchorButtonProps, NativeButtonProps {

}
/** 按钮 */
export const Button: FC<ButtonProps> = (props) => {
    const disabledValue = useDisabled(props.disabled);
    const sizeValue = useSize(props.size);
    return () => {

        const {
            loading = false,
            type = 'default',
            danger,
            shape = 'default',
            size = sizeValue() ?? 'middle',
            children,
            icon,
            ghost = false,
            block = false,
            disabled = props.disabled ?? disabledValue() ?? false,
            htmlType = 'button' as ButtonProps['htmlType'],
            class: className,
            ...rest
        } = props;

        const classNames = [
            btnStyles.button,
            btnStyles.type[type],
            btnStyles[shape],
            btnStyles[size],
            danger && btnStyles.danger,
            disabled && btnStyles.disabled,
            icon && (children === undefined || children === null) ? btnStyles.onlyIcon : null,
            className as any
        ]

        const childNode = (
            <>
                {icon && <span class={btnStyles.icon}>{icon}</span>}
                {children && <span>{children}</span>}
            </>
        )

        if (type === 'link') {
            return (
                <a {...rest} class={classNames}>{childNode}</a>
            )
        }
        return (

            <button {...rest} type={htmlType} class={classNames} >
                {childNode}
            </button>
        )
    }
}



