
import { SideBar } from 'antd-mobile'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

type NavOptionsType = '/todo_props'
  | '/todo_context' | '/todo_redux' 
  | '/counter_redux' | '/billGatway' | '/bill_zustand/gatway'

type TabsType = {
  key: NavOptionsType,
  title: string
}

function ContainBox() {
  const location = useLocation()

  const tabs: TabsType[] = [
    { key: '/todo_props', title: 'Todo_props', },
    { key: '/todo_context', title: 'Todo_context', },
    { key: '/todo_redux', title: 'Todo_redux', },
    { key: '/counter_redux', title: 'Counter_redux', },
    { key: '/bill_zustand/gatway', title: 'Bill_zustand', },
  ]
  
  const navigate = useNavigate()
  
  const getPath = (): NavOptionsType => {
    return location.pathname === '\/' ? tabs[0].key : location.pathname as NavOptionsType
  }

  const [curkey , setCurKey] = useState<NavOptionsType>(getPath())
  console.log(location.pathname);
  
  const onNavChange = (key: string) => {
    setCurKey(key as NavOptionsType)
    navigate(key)
  }

  return (
    <div className="ContainBox">
      <SideBar activeKey={curkey} onChange={onNavChange}>
        {tabs.map(item => (
          <SideBar.Item key={item.key} title={item.title} />
        ))}
      </SideBar>
      <main><Outlet></Outlet></main>
    </div>
  )
}
export default ContainBox