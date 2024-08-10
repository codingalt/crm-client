import React, { useState } from "react";
import css from "./SelectDate.module.scss";
import { Button } from "@nextui-org/react";
import Calendar from "./Calendar";
import { useTranslation } from "react-i18next";
import { toastError } from "../../Toast/Toast";

const SelectDate = ({
  paginate,
  selectedDate,
  setSelectedDate,
  tempDateSelected,
  setTempDateSelected,
  activeDay, 
  setActiveDay
}) => {
  const { t } = useTranslation();

  const handleNext = () => {
    if (!selectedDate || !activeDay) {
      toastError("Please select appointment date");
      return;
    }

    paginate(1);
  };

  return (
    <div className={css.selectDateWrapper}>
      <div
        className={`${css.heading} max-w-3xl mx-auto flex justify-between items-center`}
      >
        <span className="flex-1">{t("dateSelection")}</span>
        {/* Next Button  */}
        <div className={`${css.nextButton} flex-1`}>
          <Button onClick={handleNext}>{t("next")}</Button>
        </div>
      </div>

      <div
        className={`${css.calendarWrapper} bg-white max-w-3xl scrollbar-hide`}
      >
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          paginate={paginate}
          activeDay={activeDay}
          setActiveDay={setActiveDay}
          tempDateSelected={tempDateSelected}
          setTempDateSelected={setTempDateSelected}
        />
      </div>

      {/* Next Button Mobile  */}
      <div
        className={`${css.mobileBtn} flex md:hidden justify-center items-center`}
      >
        <Button onClick={handleNext}>{t("next")}</Button>
      </div>
    </div>
  );
};

export default SelectDate;
