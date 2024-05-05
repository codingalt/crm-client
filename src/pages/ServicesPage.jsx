import React from 'react'
import Layout from '../components/Layout/Layout';
import Services from '../components/ServicesPrices/Services';

const ServicesPage = () => {
  return <Layout children={<Services />} />;
}

export default ServicesPage