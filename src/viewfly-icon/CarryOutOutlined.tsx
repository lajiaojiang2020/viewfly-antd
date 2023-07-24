import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { CarryOutOutlined as svg } from "@ant-design/icons-svg";

export const CarryOutOutlined: JSXInternal.ElementClass<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}