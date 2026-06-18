import React from 'react'
import DashboardSideBar from '@/components/DashboardSideBar'

const DashboardLayout = ({children}) => {
  return (
    <div className="flex gap-2 min-h-screen">
      <DashboardSideBar/>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default DashboardLayout