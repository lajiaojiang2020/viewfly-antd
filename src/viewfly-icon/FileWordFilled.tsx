import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { FileWordFilled as svg } from "@ant-design/icons-svg";

export const FileWordFilled: JSXInternal.ElementClass<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}