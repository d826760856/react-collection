type Month =
  | "01" | "02" | "03" | "04" | "05" | "06"
  | "07" | "08" | "09" | "10" | "11" | "12";

type Day = 
    | "01" | "02" | "03" | "04" | "05" | "06"
    | "07" | "08" | "09" | "10" | "11" | "12"
    | "13" | "14" | "15" | "16" | "17" | "18"
    | "19" | "20" | "21" | "22" | "23" | "24"
    | "25" | "26" | "27" | "28" | "29" | "30" | "31"
type Year = `${number}`
export type YearMonth = `${number}-${Month}`;
export type YearMonthDay = `${number}-${Month}-${Day}`

export type YearDataMap = Record<Year, billItemType[]>;
export type MonthDataMap = Record<YearMonth, billItemType[]>;
export type DayDataMap = Record<YearMonthDay, billItemType[]>;

export type billItemType = {
    type: string,
    money: number,
    date: string,
    useFor: string,
    id: string
}

export type billCtxType = {
    billList: billItemType[]
    yearObj: YearDataMap
    monthObj: MonthDataMap
    getBillList: () => void
}