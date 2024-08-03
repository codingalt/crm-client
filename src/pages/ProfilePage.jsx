import React from 'react'
import Layout from "../components/Layout/Layout";
import Profile from '../components/Profile/Profile'

const ProfilePage = () => {
  return <Layout children={<Profile />} />;
}

export default ProfilePage