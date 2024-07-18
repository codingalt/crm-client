import React from 'react'
import Chat from '../components/Chat/Chat';
import Layout from '../components/Layout/Layout';

const ChatPage = () => {
  return <Layout children={<Chat />} />;
}

export default ChatPage