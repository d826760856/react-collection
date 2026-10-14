import { useState } from 'react'
import './Month_main.scss'
import classNames from 'classnames'


function DayBill_expand({ isExpand }: { isExpand: boolean }) {
    return(
        <div className={classNames('dayBill_expand', isExpand ? 'expand' : '')}>
        </div>
    )
}

function DayBill_top({ isExpand }: { isExpand: boolean }) {
    return(
        <div className={classNames('dayBill_top', isExpand ? 'expand' : '')}>
            <div className="topRow">
                <span>03月23日</span>
            </div>
            <div className="bottomRow"></div>
        </div>
    )
}

function DayBill() {
    const [ isExpand, setIsExpand ] = useState(false)
    return(
        <div className='dayBill'>
            <DayBill_top isExpand={isExpand}></DayBill_top>
            {isExpand && <DayBill_expand isExpand={isExpand}></DayBill_expand>}
        </div>
    )
}

function Month_main() {
    return(
        <div className='month_main hide-scrollbar'>
            <DayBill></DayBill>
            <DayBill></DayBill>
            <DayBill></DayBill>
            <DayBill></DayBill>
            <DayBill></DayBill>
            <DayBill></DayBill>
            <DayBill></DayBill>
            <DayBill></DayBill>
            <DayBill></DayBill>
            <DayBill></DayBill>
        </div>
    )
}
export default Month_main