import { useCallback, useEffect, useRef, useState } from 'react';
import './Bill_edit.scss'
import Nav from './components/Nav'
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd-mobile'
import { ClockCircleOutline } from 'antd-mobile-icons'
import type { PickerDate } from 'antd-mobile/es/components/date-picker/util';
import dayjs from 'dayjs';
import { useBill } from '../useBillContext';
import { TextOutline } from 'antd-mobile-icons'
import type { billtypeItemType } from '../type';
import classNames from 'classnames';

type TypeSectionProps = {
    curBillType: string
    typeSections: billtypeItemType
    onTypeBtnClick: (billType: string) => void
}

function BillItemTypeSection(props: TypeSectionProps) {
    const { curBillType, typeSections, onTypeBtnClick } = props
    return(
        <div className='typeSection'>
            <div className='title'>{typeSections.name}</div>
            <div className='TypeBtnArea'>
                { typeSections.list?.map(typeBtnItem => 
                    <div key={typeBtnItem.type} className={classNames("typeBtnBox",
                        curBillType === typeBtnItem.type ? 'active' : '')}
                        onClick={() => onTypeBtnClick(typeBtnItem.type)}
                    >
                        <div className="iconBox">
                            <TextOutline />
                        </div>
                        <span>{typeBtnItem.name}</span>
                    </div>
                ) }
            </div>
        </div>
    )    
}

type billClass = 'pay' | 'income'
function Bill_edit() {
    const navigate = useNavigate();
    const [ billClass, setBillType ] = useState<billClass>('pay') //账单类型
    const [ inputVal, setInputVal ] = useState('') //输入金额
    const [ isPicking, setIsPicking ] = useState(false) //是否选择日期
    const [ curDate, setCurDate ] = useState<PickerDate>(new Date()) //当前时间
    const todyText = useRef(dayjs(new Date()).format('YYYY-MM-DD')).current
    const pickerText = dayjs(curDate).format('YYYY-MM-DD')

    const { typeCollection, addBill, getBillList } = useBill()
    const curTypeSections = typeCollection[billClass]

    const [ curBillType, setCurBillType ] = useState('') //当前账单用途


    useEffect(() => {
        setCurBillType('') //清除账单用途
        setInputVal('') //清除金额框
    }, [billClass])

    const onTypeBtnClick = (billType: string) => {
        setCurBillType(billType)
    }

    const onSumbit = useCallback(() => {
        const money = billClass === 'pay' ? -Number(inputVal): Number(inputVal)
        const data = {
            type: billClass,
            money,
            date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            useFor: curBillType,
            id: Date.now() + ''
        }
        if(data.useFor === '' || data.money === 0) {
            console.log('无效的提交');
        }else{
            addBill(data)
            navigate('/bill_context/gatway/month')
            getBillList()
        }
    }, [billClass, inputVal, curBillType]) 

    return (
        <div className="billEdit">
            <Nav text='记一笔' onBackClick={() => navigate(-1) }></Nav>
            <div className="billEditTop">
                <div className="btnRow">
                    <button className={ billClass === 'pay' ? 'active' : '' }
                        onClick={() => setBillType('pay')}
                    >支出</button>
                    <button className={ billClass === 'income' ? 'active' : '' }
                        onClick={() => setBillType('income')}
                    >收入</button>
                </div>
                <div className='inputRow'>
                    <input type='number' value={inputVal} placeholder='0.00'
                        onChange={(e) => setInputVal(e.target.value)}>
                    </input>
                    <span className='yuan'>¥</span>
                    <button className='pickBtn' onClick={() => setIsPicking(true)} >
                        <ClockCircleOutline />
                        <span>{
                            todyText === pickerText ? '今天' : pickerText
                        }</span>
                    </button>
                    <DatePicker
                        visible={isPicking}
                        onClose={() => setIsPicking(false)}
                        precision='day'
                        onConfirm={date => setCurDate(date)}
                    />
                </div>
            </div>
            <div className="billUseforMain">
                {curTypeSections.map(typeSections =>
                    <BillItemTypeSection
                        key={typeSections.type}
                        curBillType={curBillType}
                        typeSections={typeSections}
                        onTypeBtnClick={onTypeBtnClick}
                    ></BillItemTypeSection>
                )}
                
            </div>
            <div className="submitRow">
                <button className='submitBtn'
                    onClick={onSumbit}
                >保存</button>
            </div>
        </div>
    )
}
export default Bill_edit