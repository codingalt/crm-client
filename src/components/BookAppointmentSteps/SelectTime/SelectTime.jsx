import React from "react";
import css from "./SelectTime.module.scss";
import { Button } from "@nextui-org/react";
import Clock from "./Clock";
import dayjs from "dayjs";

const SelectTime = ({ paginate, selectedTime, setSelectedTime }) => {

  const handleNext = () => {
    setSelectedTime(dayjs(selectedTime).format());
    paginate(1);
  };

  return (
    <div className={css.selectTimeWrapper}>
      <div
        className={`${css.heading} max-w-4xl mx-auto flex justify-between items-center`}
      >
        <span className="flex-1">Time Selection</span>
        {/* Next Button  */}
        <div className={`${css.nextButton} flex-1`}>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>

      <div className={`${css.clockWrapper} max-w-4xl`}>
        <Clock setSelectedTime={setSelectedTime} />

        <div className="w-full my-7 mb-10 flex justify-between items-center">
          <p className="text-default-600 font-medium text-lg">Selected Time</p>
          <p className="font-medi text-lg px-5 py-2 rounded-xl bg-[#01ABAB] text-white">
            {dayjs(selectedTime).format("hh:mm A")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectTime;
