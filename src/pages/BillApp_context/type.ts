type Month =
  | "01" | "02" | "03" | "04" | "05" | "06"
  | "07" | "08" | "09" | "10" | "11" | "12";

type Day = 
    | "01" | "02" | "03" | "04" | "05" | "06"
    | "07" | "08" | "09" | "10" | "11" | "12"
    | "13" | "14" | "15" | "16" | "17" | "18"
    | "19" | "20" | "21" | "22" | "23" | "24"
    | "25" | "26" | "27" | "28" | "29" | "30" | "31"
export type Year = `${number}`
export type YearMonth = `${number}-${Month}`;
export type YearMonthDay = `${number}-${Month}-${Day}`

export type YearDataMap = Record<Year, billItemType[]>;
export type MonthDataMap = Record<YearMonth, billItemType[]>;
export type DayDataMap = Record<YearMonthDay, billItemType[]>;

export type TypeKeyObjItem = {
    name: string,
    type: string,
    category: string
}

export type TypeKeyObj = Record<string, TypeKeyObjItem>

export type billItemType = {
    type: string,
    money: number,
    date: string,
    useFor: string,
    id: string
}

export type billtypeItemType = {
    type: string, name: string, list?: billtypeItemType[]
}

export type billtypeCollection = {
    income: billtypeItemType[], pay: billtypeItemType[]
}

export type billCtxType = {
    billList: billItemType[]
    yearObj: YearDataMap
    monthObj: MonthDataMap
    typeCollection: billtypeCollection
    typeKeyObj: TypeKeyObj
    getBillList: () => Promise<void>
    getBillType: () => Promise<void>
    getTypeKeyObj: () => Promise<void>
    addBill: (bill: billItemType) => Promise<void>
}

