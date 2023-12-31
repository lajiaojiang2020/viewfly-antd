import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { GoldOutlined as svg } from "@ant-design/icons-svg";

export const GoldOutlined: JSXInternal.ComponentConstructor<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}