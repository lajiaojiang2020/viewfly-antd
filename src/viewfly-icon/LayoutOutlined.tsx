import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { LayoutOutlined as svg } from "@ant-design/icons-svg";

export const LayoutOutlined: JSXInternal.ComponentConstructor<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}