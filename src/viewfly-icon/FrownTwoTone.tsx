import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { FrownTwoTone as svg } from "@ant-design/icons-svg";

export const FrownTwoTone: JSXInternal.ComponentConstructor<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}