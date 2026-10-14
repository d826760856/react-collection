type Month =
  | "01" | "02" | "03" | "04" | "05" | "06"
  | "07" | "08" | "09" | "10" | "11" | "12";

type Year = `${number}`
export type YearMonth = `${number}-${Month}`;

export type YearDataMap = Record<Year, billItemType[]>;
export type MonthDataMap = Record<YearMonth, billItemType[]>;

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