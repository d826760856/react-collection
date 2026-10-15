import { useEffect, useState } from 'react'
import './Month_main.scss'
import classNames from 'classnames'
import dayjs from 'dayjs'
import _ from 'lodash'
import { DownOutline, UpOutline } from 'antd-mobile-icons'
import { useBill } from '@/pages/BillApp_context/useBillContext'
import type { PickerDate } from 'antd-mobile/es/components/date-picker/util'
import type { YearMonth, YearMonthDay, DayDataMap, billItemType } from '../../../type'


type DayBill_expandPropsType = {
    isExpand: boolean
    dayBillList: billItemType[]
}

function DayBill_expand(props: DayBill_expandPropsType) {
    const { isExpand, dayBillList } = props
    const { typeKeyObj } = useBill()
    
    return(
        <div className={classNames('dayBill_expand', isExpand ? 'expand' : '')}>
            { dayBillList.map(dayBillItem =>
                <div className="daybillRow" key={dayBillItem.id}>
                    <span className='useFor'>{typeKeyObj[dayBillItem.useFor].name}</span>
                    <span className='num'>{dayBillItem.money}</span>
                </div>
            ) }
        </div>
    )
}

type DayBill_topPropsType = {
    curDate: YearMonthDay
    isExpand: boolean
    numStastic: {
        coutcome: number
        income: number
        result: number
    }
}

function DayBill_top(props: DayBill_topPropsType) {
    const { isExpand, curDate, numStastic } = props
    const split = curDate.split('-') as string[]
    const curDate_format = `${split[1]}月${split[2]}日`
    return(
        <div className={classNames('dayBill_top', isExpand ? 'expand' : '')}>
            <div className="topRow">
                <span>{curDate_format}</span>
                <div className="ArrowBox">
                    { isExpand ? <UpOutline /> : <DownOutline /> }
                </div>
            </div>
            <div className="bottomRow">
                <div className='numSection'>
                    <div className='numPart'>
                        <span className='red'>支出</span><span className='gray'>{numStastic.coutcome}</span>
                    </div>
                    <div className='numPart'>
                        <span className='green'>收入</span><span className='gray'>{numStastic.income}</span>
                    </div>
                    <div className='numPart'>
                        <span className='strong'>{numStastic.result}</span><span className='gray'>结余</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

type DayBillPropsType = {
    curDate: YearMonthDay
    dayBillList: billItemType[]
}

function DayBill(props: DayBillPropsType) {
    const { curDate, dayBillList } = props
    const [ isExpand, setIsExpand ] = useState(false)
    const [ numStastic, setNumStastic ] = useState({ coutcome: 0, income: 0, result: 0 })
    useEffect(() => {
        const payData = dayBillList?.filter(item => item.type === 'pay')
        const pay = payData?.reduce((a,b) => a + b.money, 0)
        const incomeData = dayBillList?.filter(item => item.type === 'income')
        const income = incomeData?.reduce((a,b) => a + b.money, 0)
        setNumStastic({ coutcome: pay, income: income, result: pay + income })
    }, [curDate, dayBillList])
    return(
        <div className='dayBill' onClick={() => setIsExpand(!isExpand)}>
            <DayBill_top
                isExpand={isExpand} curDate={curDate}
                numStastic={numStastic}
            ></DayBill_top>
            {isExpand && <DayBill_expand isExpand={isExpand} dayBillList={dayBillList}></DayBill_expand>}
        </div>
    )
}

function Month_main({ curDate }: { curDate: PickerDate }) {
    const { monthObj } = useBill()
    const monthKey = dayjs(curDate).format('YYYY-M') as YearMonth
    const dayList = _.orderBy(monthObj[monthKey], 'date', 'desc')
    const dayObj = _.groupBy(dayList, item => dayjs(item.date).format('YYYY-MM-DD')) as DayDataMap
    const dayObjKeys = Object.keys(dayObj) as YearMonthDay[]
    return(
        <div className='month_main hide-scrollbar'>
            { dayObjKeys.map((dayKey) =>
                <DayBill key={dayKey} curDate={dayKey} dayBillList={dayObj[dayKey]}></DayBill>
            )}
        </div>
    )
}
export default Month_main