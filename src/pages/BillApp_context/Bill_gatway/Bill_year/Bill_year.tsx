import './Bill_year.scss'
import { DownOutline, UpOutline } from 'antd-mobile-icons'
import { DatePicker } from 'antd-mobile'
import { useMemo, useState } from 'react'
import type { PickerDate } from 'antd-mobile/es/components/date-picker/util'
import dayjs from 'dayjs'
import Bill_card from '../components/Bill_card'
import { useBill } from '../../useBillContext'
import type { Year, YearMonth, billItemType } from '../../type'
import type { NumStastic } from '../components/type'
import _ from 'lodash'

type YearNumBoxProps = {
    num: number
    text: string
}
function YearNumBox(props: YearNumBoxProps) {
    const { num, text } = props
    return(
        <div className='numBox'>
            <p className='Num'>{num}</p>
            <p>{text}</p>
        </div>
    )
}

type MonthStastic = {
    title: string
    numStastic: NumStastic
}

function Bill_year() {
    const [ curDate, setCurDate ] = useState<PickerDate>(new Date())
    const [ isPicking, setIsPicking ] = useState(false)
    const yearText = dayjs(curDate).format('YYYY')
    const { yearObj, monthObj } = useBill()

    const yearStastic: YearNumBoxProps[] = useMemo(() => {
        const curYear = dayjs(curDate).format('YYYY') as Year
        const curYearList = yearObj[curYear]
        let payList: billItemType[], pay: number,
            incomeList: billItemType[], income: number;
        if(curYearList) {
            payList = curYearList.filter(item => item.type === 'pay')
            pay = payList.reduce((pre,curVal) => pre + curVal.money, 0)
            incomeList = curYearList.filter(item => item.type === 'income')
            income = incomeList.reduce((pre,curVal) => pre + curVal.money, 0)
        }else {
            pay = 0
            income = 0
        }
        return [
            { num: Number(pay.toFixed(2)), text: '支出' },
            { num: Number(income.toFixed(2)), text: '收入' },
            { num: Number((pay + income).toFixed(2)), text: '结余' }
        ]
    }, [curDate, yearObj])

    const monthStasticList: MonthStastic[] = useMemo(() => {
        let list: MonthStastic[]= []
        // 获取当前年份的所有月份key
        const monthKeys: YearMonth[] = Object.keys(monthObj).filter(monthKey => monthKey.includes(yearText)) as YearMonth[]

        monthKeys.forEach(monthKey => {
            // 当年当月账单列表
            const monthList = monthObj[monthKey]
            const payList = monthList.filter(item => item.type === 'pay')
            const monthpay = payList.reduce((pre,curVal) => pre + curVal.money, 0)
            const incomeList = monthList.filter(item => item.type === 'income')
            const monthincome = incomeList.reduce((pre,curVal) => pre + curVal.money, 0) 
            list.push({
                title: dayjs(dayjs(monthKey)).format('M') + '月',
                numStastic: {
                    coutcome: Number(monthpay.toFixed(2)),
                    income: Number(monthincome.toFixed(2)),
                    result: Number((monthpay + monthincome).toFixed(2))
                }
            })
        })

        // 按月份降序排列
        list = _.orderBy(list, (item) => Number(item.title.split('月')[0]), 'desc')

        return list
    }, [monthObj, curDate])
    return (
        <div className='billYear'>
            <div className="selectRow">
                <div className="selectBtn" onClick={() => setIsPicking(true)}>
                    <span>{yearText}年</span>
                     { isPicking ? <UpOutline/> : <DownOutline/> }
                </div>
                <DatePicker
                    value={curDate}
                    visible={isPicking}
                    onClose={() => {
                        setIsPicking(false)
                    }}
                    precision='year'
                    onConfirm={(date) => setCurDate(date)}
                />
            </div>
            <div className="stasticRow">
                { yearStastic.map(numBoxItem =>
                    <YearNumBox num={numBoxItem.num} text={numBoxItem.text} />)
                }
            </div>
            <div className="monthListArea">
                { monthStasticList.map(monthStastic => 
                    <Bill_card needExpand={false} title={monthStastic.title} numStastic={monthStastic.numStastic}/>
                )}
            </div>
        </div>
    )
}
export default Bill_year