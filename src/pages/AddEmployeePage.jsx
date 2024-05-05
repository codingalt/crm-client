import React from 'react'
import Layout from '../components/Layout/Layout'
import AddEmployee from '../components/Employees/AddEmployee'

const AddEmployeePage = () => {
  return (
    <Layout children={<AddEmployee />} />
  )
}

export default AddEmployeePage