import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { VerticalAlignMiddleOutlined as svg } from "@ant-design/icons-svg";

export const VerticalAlignMiddleOutlined: JSXInternal.ElementClass<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}