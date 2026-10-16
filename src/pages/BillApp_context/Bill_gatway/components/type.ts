export type NumStastic = {
    coutcome: number
    income: number
    result: number
}

export type Bill_cardPropsType = {
    needExpand: boolean
    title: string
    numStastic: NumStastic,
    children?: React.ReactNode
}
