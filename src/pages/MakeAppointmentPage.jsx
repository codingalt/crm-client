import React from 'react'
import Layout from '../components/Layout/Layout'
import BookAppointmentSteps from '../components/BookAppointmentSteps/BookAppointmentSteps'

const MakeAppointmentPage = () => {
  return (
    <Layout children={<BookAppointmentSteps />} />
  )
}

export default MakeAppointmentPage