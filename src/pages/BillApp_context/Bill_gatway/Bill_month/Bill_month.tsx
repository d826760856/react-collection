import styles from './Bill_month.module.scss'
import Month_top from './components/month_top'
import Month_main from './components/Month_main'
import type { PickerDate } from 'antd-mobile/es/components/date-picker/util'
import { useState } from 'react'

function Bill_month() {
    const [curDate, setCurDate] = useState<PickerDate>(new Date())
    return (
        <div className={styles.bill_month}>
            <nav>月度收支</nav>
            <div className={styles.top}>
                <Month_top curDate={curDate} onCurDateChange={(val) => setCurDate(val)}></Month_top>
            </div>
            <div className={styles.main}>
                <Month_main curDate={curDate}></Month_main>
            </div>
        </div>
    )
}
export default Bill_month