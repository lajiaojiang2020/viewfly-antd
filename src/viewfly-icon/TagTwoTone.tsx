import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { TagTwoTone as svg } from "@ant-design/icons-svg";

export const TagTwoTone: JSXInternal.ComponentConstructor<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}