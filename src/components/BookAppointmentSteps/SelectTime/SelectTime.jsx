import React from "react";
import css from "./SelectTime.module.scss";
import { Button } from "@nextui-org/react";
import Clock from "./Clock";
import dayjs from "dayjs";
import { FaArrowLeft } from "react-icons/fa6";

const SelectTime = ({
  paginate,
  selectedTime,
  setSelectedTime,
  handleBack,
}) => {
  const handleNext = () => {
    setSelectedTime(dayjs(selectedTime).format());
    paginate(1, true);
  };

  return (
    <div className={css.selectTimeWrapper}>
      <div
        className={`${css.heading} max-w-4xl mx-auto flex justify-between items-center`}
      >
        <div className="flex items-center gap-x-6">
          <div
            onClick={() => handleBack()}
            className="w-12 h-12 cursor-pointer hover:bg-default-50 transition-all text-lg border shadow-sm rounded-full flex items-center justify-center"
          >
            <FaArrowLeft />
          </div>
          <span className="flex-1">Time Selection</span>
        </div>
        {/* Next Button  */}
        <div className={`${css.nextButton} flex-1`}>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>

      <div className={`${css.clockWrapper} max-w-4xl`}>
        <Clock setSelectedTime={setSelectedTime} />

        {/* <div className="w-full px-2 md:px-0 my-0 md:my-7 mb-6 md:mb-10 flex justify-between items-center">
          <p className="text-default-600 font-medium md:text-lg text-tiny">
            Selected Time
          </p>
          <p className="md:font-medium font-normal text-tiny md:text-lg px-6 md:px-5 py-1 md:py-2 rounded-xl bg-green-100 text-black">
            {dayjs(selectedTime).format("hh:mm A")}
          </p>
        </div> */}
      </div>

      {/* Next Button Mobile  */}
      <div
        className={`${css.mobileBtn} flex md:hidden justify-center items-center`}
      >
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default SelectTime;
