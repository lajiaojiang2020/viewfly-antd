import { useSignal } from "@viewfly/core";
import RouterConfig from "../@RouterConfig";
import { HashRouterNode, router } from ".";
import { FC, JSXNode } from "../../viewfly-antd";

export interface RouterViewProps {
    /** 默认路径 */
    defaultPath?: string
}
/** 路由容器 */
export const RouterView: FC<RouterViewProps> = (props) => {
    const children = useSignal<JSXNode | null>(null);

    const toNode = (e: HashRouterNode) => {
        if (e?.type) {
            const Component = e.type;
            return <Component {...e.props}>{e.children.map(toNode)}</Component>
        }
        return null
    }
    router.onChange(e => {
        children.set(toNode(e))
    })
    router.addRouter(RouterConfig);
    !window.location.hash && router.push(props.defaultPath || '/')
    return () => children();
}

