import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import css from "./BookAppointmentSteps.module.scss";
import { wrap } from "popmotion";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      position: "absolute",
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: "relative",
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      position: "absolute",
    };
  },
};

const swipeConfidenceThreshold = 100;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};


const BookAppointmentSteps = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection) => {
      const nextPage = page + newDirection;
      if (nextPage >= 0 && nextPage <= 3 - 1) {
        setPage([nextPage, newDirection]);
      }
    };

    const dataIndex = wrap(0, 3, page);

  return (
    <div>BookAppointmentSteps</div>
  )
}

export default BookAppointmentSteps