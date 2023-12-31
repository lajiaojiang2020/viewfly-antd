import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { SkinTwoTone as svg } from "@ant-design/icons-svg";

export const SkinTwoTone: JSXInternal.ComponentConstructor<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}