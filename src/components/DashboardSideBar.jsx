import React from 'react'
import {getUserSession} from '@/lib/core/session'
import DashboardSideBarClient from './DashboardSideBarClient'

const DashboardSideBar = async() => {
  const user = await getUserSession()
  return (
    <div>
      <DashboardSideBarClient user={user}/>
    </div>
  )
}

export default DashboardSideBar