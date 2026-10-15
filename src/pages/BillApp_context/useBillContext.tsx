import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { billItemType, billCtxType, YearDataMap, MonthDataMap } from './type'
import type { billtypeCollection, TypeKeyObj } from './type'
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
    const [ typeCollection, setTypeCollection ] = useState<billtypeCollection>(
        { income: [], pay: [] }
    ) //账单分类的所有用途
    const [ typeKeyObj, setTypeKeyObj ] = useState<TypeKeyObj>({}) //账单所有用途的集合
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

    const getBillType = useCallback(async () => {
        const res = await axios.get<billtypeCollection>('http://localhost:3000/billItmeType')
        console.log(res.data);
        setTypeCollection(res.data)
    },[])

    const getTypeKeyObj = useCallback(async () => {
        const res = await axios.get<TypeKeyObj>('http://localhost:3000/billItemKey')
        console.log(res.data)
        setTypeKeyObj(res.data)
    }, [])

    const addBill = useCallback(async (bill: billItemType) => {
        const res = await axios.post('http://localhost:3000/bill', bill)
        console.log(res.data)
    },[])

    const value = useMemo(
        () => ({
            billList, yearObj, monthObj, typeCollection, typeKeyObj,
            getBillList, getBillType, addBill, getTypeKeyObj
        }),
        [ billList, yearObj, monthObj, typeCollection, typeKeyObj,
            getBillList, getBillType, addBill, getTypeKeyObj
        ]
    )
    return (
        <ctx.Provider value={value}>
            {children}
        </ctx.Provider>
    )
}

export const useBill = () => {
    const ctxData = useContext(ctx) as billCtxType
    if(!ctxData) {
        console.log('useBill => ctxData 为空')
    }
    return ctxData
}