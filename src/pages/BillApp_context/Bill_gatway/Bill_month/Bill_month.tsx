import styles from './Bill_month.module.scss'
import Month_top from './components/month_top'

function Bill_month() {
    return (
        <div className={styles.bill_month}>
            <nav>月度收支</nav>
            <div className={styles.top}>
                <Month_top></Month_top>
            </div>
        </div>
    )
}
export default Bill_month