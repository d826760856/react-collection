import { Outlet } from "react-router-dom"
import styles from './index.module.scss'
import { BillProvider } from "./useBillContext"
import { useEffect } from "react"
import { useBill } from "./useBillContext"
import type { billCtxType } from './type'

function BillProviderBox() {
    const { getBillList, getBillType, getTypeKeyObj  } = useBill() as billCtxType
    useEffect(() => {
        getBillList()
        getBillType()
        getTypeKeyObj()
    }, [])
    return (
        <Outlet></Outlet>
    )
}

function Bill_layout() {
    return(
        <div className="billApp">
            <div className={styles.gateway}>
                <BillProvider>
                    <BillProviderBox>
                    </BillProviderBox>
                </BillProvider>
            </div>
        </div>
    )
}
export default Bill_layout