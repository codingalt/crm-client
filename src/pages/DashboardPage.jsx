import React from 'react'
import Layout from '../components/Layout/Layout'
import Dashboard from '../components/Dashboard/Dashboard'

const DashboardPage = () => {
  return (
    <Layout children={<Dashboard />} />
  )
}

export default DashboardPage