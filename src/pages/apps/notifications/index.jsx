import React, { useEffect } from "react";
import css from "./notifications.module.scss";
import { useGetNotificationsQuery } from "@/services/api/notificationsApi/notificationsApi";
import { Empty } from "antd";
import { useMarkNotiAsReadMutation } from "@/services/api/authApi/authApi";
import { useTranslation } from "react-i18next";
import { Button } from "@nextui-org/react";
import DataLoading from "@/components/common/loaders/DataLoading";
import LoginRequiredCard from "@/components/widgets/login-required-card";
import useUserData from "@/hooks/useUserData";

const Notifications = () => {
  const { t } = useTranslation();
  // User Data
  const { user, isLoading: isLoadingUser } = useUserData();
  const { data, isLoading, error, refetch } = useGetNotificationsQuery();

  // Mark Notification as read
  const [markNotiAsRead, res] = useMarkNotiAsReadMutation();

  const handleMarkNotiAsRead = async () => {
    await markNotiAsRead();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleMarkNotiAsRead();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoadingUser || isLoading) {
    return <DataLoading />;
  }

  if (!isLoadingUser && !user) {
    return (
      <div className="pt-14">
        <LoginRequiredCard />
      </div>
    );
  }

  return (
    <div className={`${css.wrapper} mx-auto`}>
      <div className={css.top}>
        <h1>{t("notifications")}</h1>
      </div>

      <div className={`${css.notifications} max-w-4xl`}>
        {data?.notifications?.map((item) => (
          <div key={item.id} className={css.item}>
            <div className={css.content}>
              <div className={css.title}>{item.title}</div>
              <div className={css.desc}>{item.detail}</div>
            </div>
            <div className={`${css.dot} bg-red-400`}></div>
          </div>
        ))}

        {/* Show Error If data fails to load  */}
        {!isLoading && error && (
          <div className="px-4 w-full mx-auto max-w-md mt-28 md:mt-32 py-2 flex flex-col gap-2 items-center">
            <p className="font-medium text-[15px] md:text-lg text-[#01abab]">
              Let's try this again.
            </p>
            <span className="px-6 text-xs text-default-600 text-center max-w-xs">
              Oops! Something went wrong. We couldn't fetch the data.
            </span>
            <Button
              size="sm"
              radius="sm"
              className="mt-2 px-6 text-white bg-[#01abab]"
              onClick={refetch}
            >
              Try again
            </Button>
          </div>
        )}

        {!isLoading && data?.notifications.length === 0 && (
          <div className="flex h-56 items-center justify-center">
            <Empty description={<span>{t("noNotificationsYet")}</span>} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
