import React, { useState } from "react";
import css from "./Appointments.module.scss";
import AppointmentTabs from "./AppointmentTabs";
import { useTranslation } from "react-i18next";
import RatingModal from "@/sections/widget/rating/RatingModal";
import useUserData from "@/hooks/useUserData";
import DataLoading from "@/components/common/loaders/DataLoading";
import LoginRequiredCard from "@/components/widgets/login-required-card";

const AppointmentsPage = () => {
  const [show, setShow] = useState(false);
  const [ratingData, setRatingData] = useState(null);
  const { t } = useTranslation();
  const { user, isLoading: isLoadingUser } = useUserData();

  if (isLoadingUser) {
    return <DataLoading />;
  }

  // Show Login Required Card if User is not logged in
  if (!isLoadingUser && !user) {
    return (
      <div className="pt-14">
        <LoginRequiredCard />
      </div>
    );
  }

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.top}>
          <h1>{t("myQueues")}</h1>
        </div>

        {/* Tabs  */}
        <div className="mt-5 md:mt-7 md:px-[50px]">
          <AppointmentTabs setRatingData={setRatingData} setShow={setShow} />
        </div>
        <RatingModal show={show} setShow={setShow} data={ratingData} />
      </div>
    </>
  );
};

export default AppointmentsPage;
