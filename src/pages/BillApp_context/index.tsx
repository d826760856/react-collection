import { Outlet } from "react-router-dom"
import styles from './index.module.scss'

function Bill_layout() {
    return(
        <div className={styles.gateway}>
            <Outlet></Outlet>
        </div>
    )
}
export default Bill_layout