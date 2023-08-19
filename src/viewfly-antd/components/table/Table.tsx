import { FC } from "@antd/viewfly/ui"


/**
 * @api
 */
export interface TableProps<T extends object = object> {
    /** 数据 */
    dataSource: T[]
    /**  */
}
/** 表格  */
export const Table: FC<TableProps> = () => {


    return () => {
        return (
            <div>
            </div>
        )
    }
}