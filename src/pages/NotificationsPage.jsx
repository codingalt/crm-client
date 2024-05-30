import React from 'react'
import Layout from "../components/Layout/Layout";
import Notifications from '../components/Notifications/Notifications';

const NotificationsPage = () => {
  return <Layout children={<Notifications />} />;
}

export default NotificationsPage