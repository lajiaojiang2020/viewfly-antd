import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { CodeSandboxSquareFilled as svg } from "@ant-design/icons-svg";

export const CodeSandboxSquareFilled: JSXInternal.ElementClass<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}