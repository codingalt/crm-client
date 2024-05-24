import React from 'react'
import Layout from "../components/Layout/Layout";
import Appointments from '../components/Appointments/Appointments';

const AppointmentsPage = () => {
  return <Layout children={<Appointments />} />;
}

export default AppointmentsPage