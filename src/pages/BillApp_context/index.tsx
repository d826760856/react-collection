import { Outlet } from "react-router-dom"
import styles from './index.module.scss'
import { BillProvider } from "./useBillContext"
import classNames from "classnames"

function Bill_layout() {
    return(
        <div className="billApp">
            <div className={styles.gateway}>
                <BillProvider>
                    <Outlet></Outlet>
                </BillProvider>
            </div>
        </div>
    )
}
export default Bill_layout