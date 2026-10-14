import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { billItemType, billCtxType, YearDataMap, MonthDataMap } from './type'
import _ from 'lodash'
import dayjs from "dayjs";

const ctx = createContext<billCtxType | undefined>(undefined)

type BillProviderProps = {
    children: React.ReactNode
}


export const BillProvider = (props: BillProviderProps) => {
    const { children } = props
    const [ billList, setBillList ] = useState<billItemType[]>([])
    const [ yearObj, setYearObj ] = useState<YearDataMap>({})
    const [ monthObj, setMonthObj ] = useState<MonthDataMap>({})
    useEffect(() =>{
        const yearObj = _.groupBy(billList, (item) => dayjs(item.date).format('YYYY'))
        setYearObj(yearObj)
        const monthObj = _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-M'))
        setMonthObj(monthObj)
    }, [billList])
    
    const getBillList = useCallback(async () => {
        const res = await axios.get<billItemType[]>('http://localhost:3000/bill')
        console.log(res.data);
        setBillList(res.data)
    }, []) 

    const value = useMemo(
        () => ({ billList, yearObj, monthObj, getBillList }),
        [billList, yearObj, monthObj, getBillList]
    )
    return (
        <ctx.Provider value={value}>
            {children}
        </ctx.Provider>
    )
}

export const useBill = () => {
    const ctxData = useContext(ctx)
    if(!ctxData) {
        console.log('useBill => ctxData 为空')
    }
    return ctxData
}