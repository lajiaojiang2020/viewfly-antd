import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { MedicineBoxOutlined as svg } from "@ant-design/icons-svg";

export const MedicineBoxOutlined: JSXInternal.ElementClass<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}