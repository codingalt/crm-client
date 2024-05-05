import React from 'react'
import Layout from '../components/Layout/Layout';
import AddService from '../components/ServicesPrices/AddService';

const AddNewServicePage = () => {
  return <Layout children={<AddService />} />;
}

export default AddNewServicePage