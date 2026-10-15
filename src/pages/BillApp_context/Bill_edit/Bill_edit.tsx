import { useState } from 'react';
import './Bill_edit.scss'
import Nav from './components/Nav'
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd-mobile'
import { ClockCircleOutline } from 'antd-mobile-icons'
import type { PickerDate } from 'antd-mobile/es/components/date-picker/util';
import dayjs from 'dayjs';

type billType = 'pay' | 'income'
function Bill_edit() {
    const navigate = useNavigate();
    const [ billType, setBillType ] = useState<billType>('pay')
    const [ inputVal, setInputVal ] = useState('')
    const [ isPicking, setIsPicking ] = useState(false)
    const [ curDate, setCurDate ] = useState<PickerDate>(new Date())
    const todyText = dayjs(new Date()).format('YYYY-MM-DD')
    const pickerText = dayjs(curDate).format('YYYY-MM-DD')
    return (
        <div className="billEdit">
            <Nav text='记一笔' onBackClick={() => navigate(-1) }></Nav>
            <div className="billEditTop">
                <div className="btnRow">
                    <button className={ billType === 'pay' ? 'active' : '' }
                        onClick={() => setBillType('pay')}
                    >支出</button>
                    <button className={ billType === 'income' ? 'active' : '' }
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
                
            </div>
        </div>
    )
}
export default Bill_edit