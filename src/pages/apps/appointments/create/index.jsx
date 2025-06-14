import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import css from "./BookAppointmentSteps.module.scss";
import { wrap } from "popmotion";
import SelectDate from "./select-date/SelectDate";
import SelectTime from "./select-time/SelectTime";
import PaymentStep from "./payment/PaymentStep";
import { useSelector } from "react-redux";
import { useGetServiceDetailsByIdQuery } from "@/services/api/servicesApi/servicesApi";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useBookAppointmentMutation,
  useCheckBookingAvailableTimeMutation,
  useGetPaymentMethodsQuery,
} from "@/services/api/businessProfileApi/businessProfileApi";
import { useApiErrorHandling } from "@/hooks/useApiErrors";
import { toastError, toastSuccess } from "@/components/common/toast/Toast";
import moment from "moment";
import ConfirmPayment from "./confirm-payment/ConfirmPayment";
import ConfirmTime from "./confirm-time/ConfirmTime";
import ClipSpinner from "@/components/common/loaders/ClipSpinner";
import PaymentMethod from "./payment-method/PaymentMethod";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

const formatDateInitial = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const formatDate = (selectedDate, selectedTime) => {
  const date = moment(selectedDate);
  const time = moment(selectedTime);

  const formattedDate = date.format("YYYY-MM-DD");
  const formattedTime = time.format("HH:mm:ss");

  // Concatenate the formatted date and time
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
};

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
  const { t } = useTranslation();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serviceId = searchParams.get("service-id");

  const [loadingPayment, setLoadingPayment] = useState(null);
  const [[page, direction], setPage] = useState([0, 0]);
  const today = new Date();
  const selected = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const [selectedDate, setSelectedDate] = useState(formatDateInitial(selected));
  const [selectedTime, setSelectedTime] = useState(dayjs(new Date()));
  const [tempDateSelected, setTempDateSelected] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [isConfirmPayment, setIsConfirmPayment] = useState(null);
  const [availableTimeMsg, setAvailableTimeMsg] = useState(null);
  const [totalPages, setTotalPages] = useState(4);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const {
    data: paymentMethods,
    isLoading: isLoadingPaymentMethods,
    refetch: refetchPaymentMethods,
    error: errorPaymentMethods,
  } = useGetPaymentMethodsQuery();

  useEffect(() => {
    if (paymentMethods) {
      setPaymentMethod(paymentMethods?.paymentMethods[0]);
    }
  }, [paymentMethods]);

  useEffect(() => {
    if (availableTimeMsg) {
      setTotalPages(5);
    }
  }, [availableTimeMsg]);

  // Service Details
  const { data: service } = useGetServiceDetailsByIdQuery(serviceId);

  // Check Booking Available Time
  const [checkAvailableTime, resp] = useCheckBookingAvailableTimeMutation();
  const {
    isLoading: isLoadingAvailableTime,
    isSuccess: isSuccessAvailableTime,
  } = resp;

  const paginate = (newDirection, availTimeFlag) => {
    const nextPage = page + newDirection;

    if (nextPage >= 0 && nextPage <= totalPages) {
      // Check Booking Available Time
      if (nextPage === 2 && availTimeFlag) {
        handleCheckAvailableTime();
        return;
      }

      // Show Appointment Confirmation Page if Method is cash

      if (paymentMethod?.code === "cash" && nextPage === 3) {
        setIsConfirmPayment(true);
      } else if (paymentMethod?.code === "card" && nextPage === 3) {
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

  const handleCheckAvailableTime = async () => {
    const formattedTime = dayjs(selectedTime).format();
    const formattedDateTime = formatDate(selectedDate, formattedTime);

    const { data: availableTime } = await checkAvailableTime({
      id: serviceId,
      date: formattedDateTime,
    });

    if (availableTime && availableTime.has_appointment) {
      if (availableTime.mine_appointment) {
        setAvailableTimeMsg(t("alreadyHaveAppointment"));
      } else {
        setAvailableTimeMsg(t("serviceProviderHasAppointment"));
      }

      setPage([2, 2]);
    } else {
      paginate(1);
    }
  };

  // Book Appointment
  const [bookAppointment, res] = useBookAppointmentMutation();
  const { isLoading, error, isSuccess } = res;

  const apiErrors = error && error?.status !== 403 && useApiErrorHandling(error);

  useEffect(() => {
    if (error && error.status !== 500 && error.status != "FETCH_ERROR") {
      toastError(
        error?.data?.message ? error?.data?.message : t("somethingWentWrong")
      );
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toastSuccess(t("bookingSuccessfull"));

      setTimeout(() => {
        navigate("/appointments");
      }, 1500);
    }
  }, [isSuccess]);

  const handleBookAppointment = async () => {
    const formattedTime = dayjs(selectedTime).format();
    const formattedDateTime = formatDate(selectedDate, formattedTime);

    await bookAppointment({
      serviceId: serviceId,
      date: formattedDateTime,
      payment_method_id: paymentMethod?.id,
    });
  };

  const handleBack = () => {
    if (page > 0 && page < 4) {
      paginate(-1);
    }
  };

  const renderData = [
    <SelectDate
      paginate={paginate}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      tempDateSelected={tempDateSelected}
      setTempDateSelected={setTempDateSelected}
      activeDay={activeDay}
      setActiveDay={setActiveDay}
    />,
    <SelectTime
      paginate={paginate}
      selectedTime={selectedTime}
      setSelectedTime={setSelectedTime}
      handleBack={handleBack}
    />,
    <PaymentMethod
      paginate={paginate}
      handleBack={handleBack}
      paymentMethod={paymentMethod}
      setPaymentMethod={setPaymentMethod}
      data={paymentMethods}
      isLoading={isLoadingPaymentMethods}
      error={errorPaymentMethods}
      refetch={refetchPaymentMethods}
    />,

    isConfirmPayment ? (
      <ConfirmPayment
        data={service?.service}
        paymentMethod={paymentMethod}
        date={selectedDate}
        time={selectedTime}
        handleBookAppointment={handleBookAppointment}
        isLoading={isLoading}
        handleBack={handleBack}
      />
    ) : (
      <PaymentStep
        loading={loadingPayment}
        setLoading={setLoadingPayment}
        setIsConfirmPayment={setIsConfirmPayment}
        amount={service?.service.price - user?.balance}
        handleBack={handleBack}
      />
    ),
  ];

  if (availableTimeMsg) {
    renderData.splice(
      2,
      0,
      <ConfirmTime
        key="ConfirmTime"
        setPage={setPage}
        availableTimeMsg={availableTimeMsg}
        paginate={paginate}
      />
    );
  }

  const dataIndex = wrap(0, renderData.length, page);

  return (
    <div className={css.wrapper}>
      {isLoadingAvailableTime && (
        <div
          className="bg-black bg-opacity-5 w-full h-screen scrollbar-hide overflow-hidden flex flex-col space-y-1 items-center justify-center fixed top-0 left-0"
          style={{ zIndex: 999 }}
        >
          <ClipSpinner size={30} />
          <span className="text-[#01ABAB]">Loading...</span>
        </div>
      )}

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
                  className="w-[13px] h-[13px] md:w-[16px] md:h-[16px] bg-[#01ABAB] rounded-full transition-all"
                ></div>
              ) : (
                <div
                  key={index}
                  // onClick={() => {
                  //   page === 0 || page < index
                  //     ? paginate(1)
                  //     : index < page && paginate(-1);
                  // }}
                  className="w-[13px] h-[13px] md:w-[16px] md:h-[16px] border-1 border-[#01ABAB] rounded-full transition-all"
                ></div>
              )
            )}
      </div>
    </div>
  );
};

export default BookAppointmentSteps;
