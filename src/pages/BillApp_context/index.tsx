import { Outlet } from "react-router-dom"
import styles from './index.module.scss'
import { BillProvider } from "./useBillContext"

function Bill_layout() {
    return(
        <div className={styles.gateway}>
            <BillProvider>
                <Outlet></Outlet>
            </BillProvider>
        </div>
    )
}
export default Bill_layout