import React from 'react'
import Layout from "../components/Layout/Layout";
import Bookings from '../components/Bookings/Bookings';

const BookingsPage = () => {
  return (
    <Layout children={<Bookings />} />
  )
}

export default BookingsPage