import React, { useEffect, useState } from "react";
import css from "./Notifications.module.scss";
import { useGetNotificationsQuery } from "../../services/api/notificationsApi/notificationsApi";
import ClipSpinner from "../Loader/ClipSpinner";
import { Empty } from "antd";
import { useMarkNotiAsReadMutation } from "../../services/api/authApi/authApi";

const Notifications = () => {
  const { data, isLoading } = useGetNotificationsQuery();
  
  // Mark Notification as read 
  const [markNotiAsRead, res] = useMarkNotiAsReadMutation();

  const handleMarkNotiAsRead = async() => {
    await markNotiAsRead();
  }

   useEffect(() => {
     const timer = setTimeout(() => {
       handleMarkNotiAsRead();
     }, 1000); 

     return () => clearTimeout(timer); 
   }, []);

  return (
    <div className={`${css.wrapper} max-w-4xl mx-auto`}>
      <div className={css.top}>
        <h1>Notifications</h1>
      </div>

      <div className={css.notifications}>
        {data?.notifications?.map((item) => (
          <div key={item.id} className={css.item}>
            <div className={css.content}>
              <div className={css.title}>{item.title}</div>
              <div className={css.desc}>{item.detail}</div>
            </div>
            <div className={`${css.dot} bg-red-400`}></div>
          </div>
        ))}

        {
          // Loading
          isLoading && (
            <div className="flex h-48 items-center justify-center">
              <ClipSpinner />
            </div>
          )
        }

        {!isLoading && data?.notifications.length === 0 && (
          <div className="flex h-56 items-center justify-center">
            <Empty description={<span>No Notifications yet.</span>} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
