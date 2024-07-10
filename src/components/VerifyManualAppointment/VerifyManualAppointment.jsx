import React, { useEffect, useState } from "react";
import css from "./VerifyManualAppointment.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Button, Image } from "@nextui-org/react";
import logo from "../../assets/logo2.svg";
import serviceImg from "../../assets/h3.jpg";
import Rating from "@mui/material/Rating";
import { MdErrorOutline } from "react-icons/md";
import { useConfirmAppointmentMutation, useValidateManualAppointmentUrlQuery } from "../../services/api/businessProfileApi/businessProfileApi";
import moment from "moment";
import { useApiErrorHandling } from "../../hooks/useApiErrors";
import { toastError } from "../Toast/Toast";

const VerifyManualAppointment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [show, setShow] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  // Validate Token and email
  const { data, isLoading, isSuccess, error } =
    useValidateManualAppointmentUrlQuery({ email: email, token: token });

  // Confirm Appointment Mutation 
  const [confirmAppointment, res1] = useConfirmAppointmentMutation();
  const {isLoading: isLoadingConfirmApp, isSuccess: isSuccessConfirmApp, error: errorConfirmApp} = res1; 

  const apiErrors = useApiErrorHandling(errorConfirmApp);

  // useEffect(() => {
  //   if (
  //     errorConfirmApp &&
  //     errorConfirmApp.status !== 500 &&
  //     errorConfirmApp.status != "FETCH_ERROR"
  //   ) {
  //     toastError(
  //       errorConfirmApp?.data?.message
  //         ? errorConfirmApp?.data?.message
  //         : "Uh ho! Something went wrong"
  //     );
  //   }
  // }, [errorConfirmApp]);

  useEffect(() => {
    if(isSuccessConfirmApp){
      navigate("payment/success");
    }
  }, [isSuccessConfirmApp]);

  useEffect(() => {
    if (error) {
      if (error?.status == 410) {
        setErrorMessage("Link Epired!");
      } else if (error?.status !== 410 || error?.status == "FETCH_ERROR") {
        setErrorMessage("Uh ho! Something went wrong");
      }
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setShow(true);
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "999",
          paddingBottom: "3rem",
        }}
      >
        <ClipLoader color="#01AB8E" size={45} speedMultiplier={0.85} />
      </div>
    );
  }

  if (!isLoading && errorMessage && error) {
    return (
      <div className="w-full h-screen md:max-w-screen-md lg:max-w-screen-lg mx-auto">
        <div className="pt-6 md:pt-6 w-full px-4 md:px-0">
          <div className="w-32 md:w-36 md:ml-0">
            <Image src={logo} width={"100%"} height={"100%"} alt="Logo" />
          </div>
        </div>
        <div className="w-full py-60 md:py-52 px-5 md:px-0 -mt-3 flex flex-col gap-2 justify-center items-center mx-auto">
          <MdErrorOutline className="text-[#01ABAB] text-[65px] md:text-[65px]" />
          <p className="text-2xl text-default-900 font-semibold mt-1">
            {errorMessage}
          </p>
          <p className="text-sm text-default-700 font-medium text-center">
            {error.status == 410
              ? "The link you are trying to validate has been expired."
              : "Something's missing. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  const handleConfirmAppointment = async () => {
    const paymentMethod = data.paymentMethod.code;
    const redirect = `/verifyAppointment/payment?token=${token}&email=${encodeURIComponent(
      email
    )}`;

    // Check User Balance 
    const checkBalance = parseInt(data?.service.price) - parseInt(data?.customer?.balance);

    if (paymentMethod === "card") {

      if (checkBalance <= 0) {
        // It Means User have enough balance in wallet. Confirm Appointment Directly
        await confirmAppointment();
      } else if (checkBalance > 0) {
        // User do not have enough balance in wallet. Show Stripe Form
        navigate(redirect);
      }

    } else {
      // If Cash Payment. Directly Confirm Appointment 
      await confirmAppointment();
    }
  };

  return (
    <div className={css.wrapper}>
      {show && (
        <div className="w-full md:max-w-screen-md lg:max-w-screen-lg h-screen mx-auto pt-5 md:pt-0 px-6 md:px-0 lg:px-10 xl:px-0">
          <header className="py-7 pt-11 md:pt-6 w-full">
            <div className="w-32 md:w-36 -ml-1 md:ml-0">
              <Image src={logo} width={"100%"} height={"100%"} alt="Logo" />
            </div>
          </header>

          <div className="pt-8 md:py-6">
            <h3 className="text-xl md:text-2xl font-medium">
              Appointment Confirmation
            </h3>
            <p className="max-w-4xl mt-3 md:mt-5 text-xs md:text-medium text-default-700 font-normal">
              Dear{" "}
              <span className="text-[#01ABAB]">{data?.customer?.name}</span>,
              Thank you for choosing our services! We are pleased to confirm
              your appointment <br className="hidden md:block" /> at{" "}
              <span className="text-[#01ABAB] font-medium">
                {data?.business?.name}
              </span>{" "}
              for a {data?.service?.name}. Below are the details of your
              booking:
            </p>
          </div>

          {/* Card  */}
          <div className="mt-6 md:mt-0 rounded-lg border-1 border-gray-300 shadow-sm py-5 px-5">
            <div className="flex gap-x-4 flex-col md:flex-row">
              <div className="w-full relative max-h-80 rounded-md flex-1 overflow-hidden">
                <Image
                  src={serviceImg}
                  width={"100%"}
                  height={"100%"}
                  alt="Service Image"
                  radius="md"
                  removeWrapper
                />

                {/* Service Details over Image | Overlay  */}
                <div className="absolute left-0 right-0 bottom-0 bg-black bg-opacity-45 py-1.5 md:py-2.5 px-3.5 md:px-5 z-10">
                  <p className="text-white font-medium text-sm md:text-lg">
                    {data?.service?.name}
                  </p>
                  <Rating size="small" name="read-only" value={5} readOnly />
                </div>
              </div>
              <div className="flex-1 mt-5 ml-0 md:mt-0">
                <div className="flex justify-between items-center mb-4 md:px-5">
                  <p className="text-sm md:text-lg font-medium">Date:</p>
                  <span className="text-default-800">
                    {moment(data?.appointment_date).format("MMMM D, YYYY")}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4 md:px-5">
                  <p className="text-sm md:text-lg font-medium">Time:</p>
                  <span className="text-default-800">
                    {moment(data?.appointment_date).format("hh:mm A")}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-4 md:px-5">
                  <p className="text-sm md:text-lg font-medium">
                    Payment Type:
                  </p>
                  <span className="text-default-800">
                    {data?.paymentMethod?.name}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-5 md:px-5">
                  <div className="w-full border-1 border-gray-300 mt-4 rounded-full"></div>
                </div>

                <div className="flex justify-between items-center mb-4 md:px-5">
                  <span className="text-default-800 md:text-xl">Total</span>
                  <p className="text-lg md:text-2xl font-medium">
                    ${data?.service?.price}
                  </p>
                </div>

                <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-4 md:gap-6 mt-16">
                  <Button
                    size="lg"
                    radius="sm"
                    className="bg-transparent font-medium w-[95%] md:w-auto text-[#01ABAB] hover:bg-red-100 hover:text-red-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="lg"
                    radius="sm"
                    className="bg-[#01ABAB] text-white w-[95%] md:w-auto"
                    onClick={handleConfirmAppointment}
                    isLoading={isLoadingConfirmApp}
                  >
                    Confirm Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Description  */}
          <div className="w-full max-w-4xl text-center mx-auto text-default-700 font-normal text-sm my-16 pb-16 px-1 md:px-0">
            <p>
              Please ensure to arrive at least 10 minutes prior to your
              appointment to complete any necessary preparations. If you need to
              make any changes to your booking, kindly contact{" "}
              {data?.business?.name} {" "}
              Customer Care at your earliest convenience.
            </p>

            <p className="mt-6">
              We look forward to providing you with excellent service. Thank you
              for putting trust in us.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyManualAppointment;
