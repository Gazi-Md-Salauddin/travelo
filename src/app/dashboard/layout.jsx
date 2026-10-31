import React from 'react'
import DashboardSideBar from '@/components/DashboardSideBar'

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row space-y-2 lg:space-y-0 pt-2 px-2 dark:bg-[#171717]">
      <DashboardSideBar />
      <div className="flex-1 pb-4">{children}</div>
    </div>
  )
}

export default DashboardLayout