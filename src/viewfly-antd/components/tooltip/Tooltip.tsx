import { FC } from "@antd/viewfly/ui"
import { HTMLAttributes } from "@viewfly/platform-browser"

/**
 * @api
 */
export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {

}
//TODO
/**  */
export const Tooltip: FC<TooltipProps> = (props) => {
    return () => {
        return (
            <>
                {props.children}
            </>
        )
    }
}