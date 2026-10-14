import styles from './Bill_month.module.scss'
import Month_top from './components/month_top'
import Month_main from './components/Month_main'

function Bill_month() {
    return (
        <div className={styles.bill_month}>
            <nav>月度收支</nav>
            <div className={styles.top}>
                <Month_top></Month_top>
            </div>
            <div className={styles.main}>
                <Month_main></Month_main>
            </div>
        </div>
    )
}
export default Bill_month