import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { CopyrightCircleFilled as svg } from "@ant-design/icons-svg";

export const CopyrightCircleFilled: JSXInternal.ComponentConstructor<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}