import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { BulbTwoTone as svg } from "@ant-design/icons-svg";

export const BulbTwoTone: JSXInternal.ElementClass<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}