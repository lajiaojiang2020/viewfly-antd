import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { LeftCircleTwoTone as svg } from "@ant-design/icons-svg";

export const LeftCircleTwoTone: JSXInternal.ElementClass<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}