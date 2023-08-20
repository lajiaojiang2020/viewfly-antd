import { GroupProvide, GroupProvideProps, useGroup } from "@/viewfly-antd/context/GroupProvide"
import { SizeProvide, useSizeWithProps } from "@/viewfly-antd/context/SizeProvide"
import { DisabledProvide, FC, SizeType, useDisabledWithProps } from "@antd/viewfly/ui"
import { HTMLAttributes } from "@viewfly/platform-browser";
import { radioStyle } from './RadioStyle'
import { useDerived } from "@viewfly/core"
import { useClickAnimateRef } from "@/viewfly-antd/hooks/useClickAnimateRef";

/**
 * @api
 */
export interface RadioProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onCheck'> {
    /** 尺寸
     * @default middle
     */
    size?: SizeType;
    /** 禁用状态 */
    disabled?: boolean;
    /** 是否选中 */
    checked?: boolean
    /** 根据 value 进行比较，判断是否选中 */
    value: any
    /** 子节点 */
    children?: any
    /** 选中事件 */
    onCheck?: (value: boolean) => any

}
/** 单选  */
export const Radio: FC<RadioProps> & RadioInstance = (props) => {
    return () => <Base {...props} />

}

/** 单选按钮  */
const Button: FC<RadioProps> = (props) => {
    return () => <Base {...props} button />
}

const RadioInput: FC<HTMLAttributes<HTMLInputElement> & { checked?: boolean }> = (props) => {
    return () => {
        return (
            <span class={radioStyle.input}>
                <input type='radoi' {...props} checked={props.checked ? 'true' : undefined} />
            </span>
        )
    }
}

const Base: FC<RadioProps & { button?: boolean }> = (_props) => {
    const disabledValue = useDisabledWithProps(_props);
    const sizeValue = useSizeWithProps(_props, 'middle');
    const checkedValue = useGroup('')
    const isChecked = useDerived(() => _props.checked ?? checkedValue() === _props.value)
    const clickPuffOut = useClickAnimateRef()

    const handleClick = () => {
        const val = !isChecked()
        _props.onCheck && _props.onCheck(val);
        checkedValue.set(_props.value);
    }

    return () => {
        const {
            checked = isChecked(),
            children,
            size = sizeValue(),
            disabled = disabledValue(),
            value,
            onCheck,
            class: _className,
            button,
            ref,
            ...props
        } = _props;

        const className = [
            _className,
            radioStyle.radio,
            button && radioStyle.button,
            radioStyle[size],
            checked && [radioStyle.checked, 'active']
        ]

        return (
            <label {...props} class={className} onClick={handleClick} ref={[ref, clickPuffOut]}>
                <RadioInput checked />
                <span>{children}</span>
            </label>
        )
    }
}



export interface RadioInstance {
    Group: typeof Group
    Button: typeof Button
}

export type RadioGroupButtonStyle = 'outline' | 'solid';
export type RadioGroupOptionType = 'default' | 'button';

/**
 * @api
 */
export interface RadioGroupProps extends Omit<RadioProps, 'value'>, GroupProvideProps, Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** 用于设置 Radio options 类型	
     * @default default
     */
    optionType?: RadioGroupOptionType;
    /** RadioButton 的风格样式，目前有描边和填色两种风格
     * @default outline
     */
    buttonStyle?: RadioGroupButtonStyle;
}
/** 单选组 */
const Group: FC<RadioGroupProps> = (_props) => {
    const disabledValue = useDisabledWithProps(_props);
    const sizeValue = useSizeWithProps(_props, 'middle');
    return () => {
        const {
            children,
            size = sizeValue(),
            optionType = 'default',
            buttonStyle = 'outline',
            disabled = disabledValue(),
            value,
            onChange,
            class: _className,
            ...props
        } = _props;
        const className = [_className, radioStyle.group, radioStyle[buttonStyle]]
        return (
            <DisabledProvide value={disabled}>
                <SizeProvide value={size as SizeType}>
                    <GroupProvide value={value} onChange={onChange} >
                        <div {...props} class={className}>{children}</div>
                    </GroupProvide>
                </SizeProvide>
            </DisabledProvide>
        )
    }

}

Radio.Group = Group
Radio.Button = Button