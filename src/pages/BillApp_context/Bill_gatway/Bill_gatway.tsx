
import { TabBar } from 'antd-mobile'
import { FolderOutline, AddCircleOutline, FileOutline } from 'antd-mobile-icons'
import styles from './Bill_gatway.module.scss'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBill } from "../useBillContext"
import type { billCtxType } from '../type'

function Bill_gatway() {
    const tabs = [
        { key: '/bill_zustand/gatway/month', title: '月度收支', icon: <FolderOutline /> },
        { key: '/bill_zustand/edit', title: '记账', icon: <AddCircleOutline /> },
        { key: '/bill_zustand/gatway/year', title: '年度账单', icon: <FileOutline /> }
    ]

    const [curkey, setCurkey] = useState(tabs[0].key)

    const navigate = useNavigate()
    const onChange = (key: string) => {
        setCurkey(key)
        navigate(key)
    }

    const { getBillList } = useBill() as billCtxType
    useEffect(() => {
        getBillList()
    }, [])

    return (
        <>
            <section className={styles.top}>
                <Outlet></Outlet>
            </section>
            <div className={styles.bottom}>
                <TabBar activeKey={curkey} onChange={onChange}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
                </TabBar>
            </div>
        </>
    )
}
export default Bill_gatway