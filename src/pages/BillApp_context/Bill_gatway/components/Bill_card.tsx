import type React from "react"
import { DownOutline, UpOutline } from 'antd-mobile-icons'
import classNames from "classnames"
import { useState } from "react"
import './Bill_card.scss'
import type { Bill_cardPropsType } from './type'

function Bill_card(props: Bill_cardPropsType) {
    const { needExpand, title, numStastic, children } = props
    const [ isExpand, setIsExpand ] = useState(false)
    const onCardClick = () => {
        return needExpand ? setIsExpand(!isExpand) : ''
    }
    return(
        <div className={classNames('Bill_card', isExpand ? 'expand' : '')}
            onClick={onCardClick}
        >
            <div className="Bill_card_top">
                <div className="topRow">
                    <span>{title}</span>
                    {
                        needExpand ? 
                        <div className="ArrowBox">
                            { isExpand ? <UpOutline /> : <DownOutline /> }
                        </div> : <></>
                    }
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
            { 
                needExpand ? 
                    isExpand ? <div className='Bill_card_expand'>{children}</div> : <></>
                    : <></>
            }
        </div>
    )
}
export default Bill_card