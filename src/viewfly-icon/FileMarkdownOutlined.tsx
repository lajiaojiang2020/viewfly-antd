import { JSXInternal } from "@viewfly/core";
import { VFIcon, VFIconProps } from "./icon";
import { FileMarkdownOutlined as svg } from "@ant-design/icons-svg";

export const FileMarkdownOutlined: JSXInternal.ElementClass<VFIconProps> = (props) => {
    return () => <VFIcon {...props} svg={svg} />
}