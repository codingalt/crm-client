import React from "react";
import css from "./SelectDate.module.scss";
import Calendar from "./Calendar";
import { Button } from "@nextui-org/react";
import Calendar2 from "./Calendar2";
import { useTranslation } from "react-i18next";

const SelectDate = ({ paginate, setSelectedDate }) => {
  const { t } = useTranslation();
  const handleNext = () => {
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
        <Calendar2 setSelectedDate={setSelectedDate} />
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
