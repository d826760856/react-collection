import { useMemo, useState } from 'react'
import styles from './Month_top.module.scss'
import { DownOutline, UpOutline } from 'antd-mobile-icons'
import { DatePicker } from 'antd-mobile'
import { useBill } from '@/pages/BillApp_context/useBillContext'
import type { billCtxType, billItemType, YearMonth } from '@/pages/BillApp_context/type'
import type { PickerDate } from 'antd-mobile/es/components/date-picker/util'
import dayjs from 'dayjs'

type DatePickerPropsType = {
    curDate: PickerDate,
    onDateChange: (date: PickerDate) => void
}

const DatePicker_bill = (props: DatePickerPropsType) => {
    const { curDate, onDateChange } = props
    const [isPicking, setIspicking] = useState(false)
    
    const { dateText } = useMemo(()=>({ dateText: dayjs(curDate).format('YYYY | M') }), [curDate])
    return(
        <>
            <div className={styles.datePicker}>
                <div className={styles.clickBox} onClick={()=> setIspicking(!isPicking)}>
                    <span>{dateText}月账单</span>
                    <div className={styles.icon}>
                        { isPicking ? <UpOutline /> : <DownOutline /> }
                    </div>
                </div>
            </div>
            <DatePicker
                value={curDate}
                visible={isPicking}
                onClose={() => {
                    setIspicking(false)
                }}
                precision='month'
                onConfirm={(date) => onDateChange(date)}
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

type Month_topPropsType = {
    curDate: PickerDate,
    onCurDateChange: (val: PickerDate) => void
}
function Month_top(props: Month_topPropsType) {
    const { curDate, onCurDateChange } = props
    const { monthObj } =  useBill() as billCtxType
    const { monthStastic } = useMemo(() => {
        const monthKey = dayjs(curDate).format('YYYY-M') as YearMonth
        const monthData = monthObj[monthKey]
        let payData: billItemType[], pay: number,
            incomeData: billItemType[], income: number
        if(monthData) {
            payData = monthData?.filter(item => item.type === 'pay')
            pay = payData?.reduce((a,b) => a + b.money, 0)
            incomeData = monthData?.filter(item => item.type === 'income')
            income = incomeData?.reduce((a,b) => a + b.money, 0)
        }else {
            payData = []
            pay = 0,
            incomeData = []
            income = 0
        }
        
        return {
            monthStastic: [
                { type: '支出', num: pay },
                { type: '收入', num: income },
                { type: '结余', num: pay + income }
            ]
        }
    }, [curDate, monthObj])

    return(
        <div className={styles.month_top}>
            <DatePicker_bill curDate={curDate}
                onDateChange={(val) => onCurDateChange(val)}>
            </DatePicker_bill>
            <div className={styles.numViewRow}>
                { monthStastic.map(item => <NumView key={item.type} num={item.num} type={item.type}></NumView>) }
            </div>
        </div>
    )
}
export default Month_top