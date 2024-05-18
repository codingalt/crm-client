import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import css from "./BookAppointmentSteps.module.scss";
import { wrap } from "popmotion";
import SelectDate from "./SelectDate/SelectDate";
import SelectTime from "./SelectTime/SelectTime";
import PaymentStep from "./Payment/PaymentStep";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      position: "absolute",
      scrollbarWidth: "none",
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: "relative",
    scrollbarWidth: "none",
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      position: "absolute",
      scrollbarWidth: "none",
    };
  },
};

const BookAppointmentSteps = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();

  const paginate = (newDirection) => {
    const nextPage = page + newDirection;
    if (nextPage >= 0 && nextPage <= 3) {
      setPage([nextPage, newDirection]);
    }
  };

  const renderData = [
    <SelectDate paginate={paginate} setSelectedDate={setSelectedDate} />,
    <SelectTime
      paginate={paginate}
      selectedTime={selectedTime}
      setSelectedTime={setSelectedTime}
    />,
    <PaymentStep />
  ];

  const dataIndex = wrap(0, renderData.length, page);

  return (
    <div className={css.wrapper}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 200, damping: 30 },
            opacity: { duration: 0.3 },
          }}
        >
          {renderData[dataIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Render Dots  */}
      <div className="flex w-full mt-3 bottom-28 space-x-2 items-center justify-center mx-auto">
        {Array(renderData.length)
          .fill(null)
          .map((item, index) =>
            page === index ? (
              <div
                key={index}
                className="w-[16px] h-[16px] bg-[#01ABAB] rounded-full cursor-pointer transition-all"
              ></div>
            ) : (
              <div
                key={index}
                onClick={() => {
                  page === 0 || page < index
                    ? paginate(1)
                    : index < page && paginate(-1);
                }}
                className="w-[16px] h-[16px] border-1 border-[#01ABAB] rounded-full cursor-pointer transition-all"
              ></div>
            )
          )}
      </div>
    </div>
  );
};

export default BookAppointmentSteps;
