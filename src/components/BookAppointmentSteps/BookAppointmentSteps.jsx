import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import css from "./BookAppointmentSteps.module.scss";
import { wrap } from "popmotion";
import SelectDate from "./SelectDate/SelectDate";
import SelectTime from "./SelectTime/SelectTime";
import PaymentStep from "./Payment/PaymentStep";
import { useSelector } from "react-redux";
import { useGetServiceDetailsByIdQuery } from "../../services/api/servicesApi/servicesApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookAppointmentMutation } from "../../services/api/businessProfileApi/businessProfileApi";
import { useApiErrorHandling } from "../../hooks/useApiErrors";
import { toastError, toastSuccess } from "../Toast/Toast";
import moment from "moment";
import ConfirmPayment from "./ConfirmPayment/ConfirmPayment";

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
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serviceId = searchParams.get("service-id");

  const [loadingPayment, setLoadingPayment] = useState(null);
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [isConfirmPayment, setIsConfirmPayment] = useState(null);

  // Service Details
  const { data: service } = useGetServiceDetailsByIdQuery(serviceId);

  const paginate = (newDirection) => {
    const nextPage = page + newDirection;
    if (nextPage >= 0 && nextPage <= 3) {
      if (nextPage === 2) {
        console.log(nextPage);
        // Process Payment and User Balance Details
        const checkBalance = service?.service.price - user?.balance;

        if (checkBalance <= 0) {
          // It Means User have enough balance in wallet. Show Confirm Payment Component
          setIsConfirmPayment(true);
        } else if (checkBalance > 0) {
          // User do not have enough balance in wallet. Show Stripe Form
          setIsConfirmPayment(false);
        }
      }
      setPage([nextPage, newDirection]);
    }
  };

  // Book Appointment
  const [bookAppointment, res] = useBookAppointmentMutation();
  const { isLoading, error, isSuccess } = res;

  const apiErrors = useApiErrorHandling(error);

  useEffect(() => {
    if (error && error.status !== 500 && error.status != "FETCH_ERROR") {
      toastError(
        error?.data?.message
          ? error?.data?.message
          : "Uh ho! Something went wrong"
      );
    }
  }, [error]);

  useEffect(()=>{
    if(isSuccess){
      toastSuccess("Booking Successfull");

      setTimeout(() => {
          navigate("/appointments");
      }, 1500);
    }
  },[isSuccess]);

  const handleBookAppointment = async () => {
    const date = moment(selectedDate);
    const time = moment(selectedTime);

    const formattedDate = date.format("YYYY-MM-DD");
    const formattedTime = time.format("HH:mm:ss");

    // Concatenate the formatted date and time
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    console.log("formattedDateTime", formattedDateTime);
    await bookAppointment({ serviceId: serviceId, date: formattedDateTime });
  };

  const renderData = [
    <SelectDate paginate={paginate} setSelectedDate={setSelectedDate} />,
    <SelectTime
      paginate={paginate}
      selectedTime={selectedTime}
      setSelectedTime={setSelectedTime}
    />,
    isConfirmPayment ? (
      <ConfirmPayment
        data={service?.service}
        handleBookAppointment={handleBookAppointment}
        isLoading={isLoading}
      />
    ) : (
      <PaymentStep
        loading={loadingPayment}
        setLoading={setLoadingPayment}
        setIsConfirmPayment={setIsConfirmPayment}
        amount={service?.service.price - user?.balance}
      />
    ),
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
        {!loadingPayment &&
          Array(renderData.length)
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
