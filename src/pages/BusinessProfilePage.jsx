import React from 'react'
import Layout from '../components/Layout/Layout'
import BusinessProfile from '../components/BusinessProfile/BusinessProfile'

const BusinessProfilePage = () => {
  return (
    <Layout children={<BusinessProfile />} />
  )
}

export default BusinessProfilePage