
import { TabBar } from 'antd-mobile'
import { FolderOutline, AddCircleOutline, FileOutline } from 'antd-mobile-icons'
import styles from './Bill_gatway.module.scss'
import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Bill_gatway() {
    const tabs = [
        { key: '/bill_context/gatway/month', title: '月度收支', icon: <FolderOutline /> },
        { key: '/bill_context/edit', title: '记账', icon: <AddCircleOutline /> },
        { key: '/bill_context/gatway/year', title: '年度账单', icon: <FileOutline /> }
    ]
    const location = useLocation()
    const getPathName = () => {
        if(location.pathname === '/bill_context/gatway')
            return '/bill_context/gatway/month'
        else return location.pathname
    }
    
    const [curkey, setCurkey] = useState(getPathName())

    const navigate = useNavigate()
    const onChange = (key: string) => {
        setCurkey(key)
        navigate(key)
    }

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