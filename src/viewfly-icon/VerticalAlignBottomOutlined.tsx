import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { VerticalAlignBottomOutlined as svg } from "@ant-design/icons-svg";

export const VerticalAlignBottomOutlined: JSXInternal.ElementClass<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}