import React from 'react';
import css from "./SelectDate.module.scss"
import Calendar from './Calendar';
import {Button} from "@nextui-org/react"

const SelectDate = ({ paginate, setSelectedDate }) => {
  const handleNext = () => {
    paginate(1);
  };

  return (
    <div className={css.selectDateWrapper}>
      <div
        className={`${css.heading} max-w-4xl mx-auto flex justify-between items-center`}
      >
        <span className="flex-1">Date Selection</span>
        {/* Next Button  */}
        <div className={`${css.nextButton} flex-1`}>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>

      <div
        className={`${css.calendarWrapper} bg-white max-w-4xl scrollbar-hide`}
      >
        <Calendar setSelectedDate={setSelectedDate} />
      </div>

      <div className="flex w-full text-center justify-center">
        <p className="text-default-600 font-medium text-medium my-2">
          You have no appointment on this day{" "}
        </p>
      </div>

      {/* Next Button  */}
      {/* <div className={css.nextButton}>
        <Button onClick={handleNext}>Next</Button>
      </div> */}
    </div>
  );
};

export default SelectDate