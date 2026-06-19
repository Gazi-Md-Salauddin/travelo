import React from 'react'
import DashboardSideBar from '@/components/DashboardSideBar'

const DashboardLayout = ({children}) => {
  return (
    <div className="min-h-screen space-y-2 pt-2 px-2">
      <DashboardSideBar/>
      <div className="flex-1 pb-4">{children}</div>
    </div>
  )
}

export default DashboardLayout