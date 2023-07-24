import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { InfoCircleTwoTone as svg } from "@ant-design/icons-svg";

export const InfoCircleTwoTone: JSXInternal.ElementClass<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}