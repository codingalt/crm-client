import React from 'react'
import Layout from '../components/Layout/Layout';
import { Profile } from '../components/Profile/Profile';

const BusinessProfilePage = () => {
  return <Layout children={<Profile />} />;
}

export default BusinessProfilePage