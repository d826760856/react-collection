import { useState } from 'react'
import styles from './month_top.module.scss'
import { DownOutline, UpOutline } from 'antd-mobile-icons'
import { DatePicker } from 'antd-mobile'

function DatePicker_bill() {
    const [isPicking, setIspicking] = useState(false)
    return(
        <>
            <div className={styles.datePicker}>
                <div className={styles.clickBox} onClick={()=> setIspicking(!isPicking)}>
                    <span>2023 | 3月账单</span>
                    <div className={styles.icon}>
                        { isPicking ? <UpOutline /> : <DownOutline /> }
                    </div>
                </div>
            </div>
            <DatePicker
                visible={isPicking}
                onClose={() => {
                    setIspicking(false)
                }}
                precision='month'
                onConfirm={() => {}}
            />
        </>
    )
}
type NumViewPropsType = {
    num: number, type: string
}
function NumView(props: NumViewPropsType) {
    return(
        <div className={styles.numView} >
            <p className={styles.num}>{props.num}</p>
            <p className={styles.type}>{props.type}</p>
        </div>
    )
}

function Month_top() {
    const [monthData] = useState([
        { type: '支出', num: 180.00 },
        { type: '收入', num: 10000.00 },
        { type: '结余', num: 9820.00 }
    ])
    return(
        <div className={styles.month_top}>
            <DatePicker_bill></DatePicker_bill>
            <div className={styles.numViewRow}>
                { monthData.map(item => <NumView num={item.num} type={item.type}></NumView>) }
            </div>
        </div>
    )
}
export default Month_top