import React, { useEffect, useState } from "react";
import Payment from "./Payment";
import { Image, Skeleton } from "@nextui-org/react";
import logo from "@/assets/logo2.svg";
import { ClipLoader } from "react-spinners";
import { truncateText } from "@/utils/helpers/helpers";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useValidateManualAppointmentUrlQuery } from "@/services/api/businessProfileApi/businessProfileApi";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useValidateTokenQuery } from "@/services/api/authApi/authApi";

const ManualAppointmentPayment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // Check if user is logged in
  const { data: auth, isLoading: isLoadingValidate } = useValidateTokenQuery();

  useEffect(() => {
    const redirect = `/verifyAppointment/payment?token=${token}&email=${encodeURIComponent(
      email
    )}`;

    if (!isLoadingValidate) {
      if (!auth) {
        navigate(`/?redirect=${encodeURIComponent(redirect)}`);
      }
    }
  }, [auth, isLoadingValidate]);

  // Validate Token and email
  const { data, isLoading, error } = useValidateManualAppointmentUrlQuery({
    email: email,
    token: token,
  });

  return (
    <div className="w-full h-full">
      <div className="w-full md:max-w-screen-md lg:max-w-screen-2xl h-screen mx-auto pt-5 md:pt-0 px-4 md:px-0 lg:px-10 xl:px-14">
        {/* Show Loading  */}
        {(loading || isLoadingValidate) && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "9999",
              position: "fixed",
              top: "5rem",
              marginTop: "0rem",
              left: "0",
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <div className="-mt-96">
              <ClipLoader color="#01ABAB" size={40} speedMultiplier={0.9} />
            </div>
          </div>
        )}

        <header className="py-7 pt-11 md:pt-6 w-full">
          <div className="w-32 md:w-36 -ml-1 md:ml-0">
            <Image src={logo} width={"100%"} height={"100%"} alt="Logo" />
          </div>
        </header>

        <div className="pt-6 md:pt-11 pb-11 flex flex-col gap-1 md:gap-10 md:flex-row border rounded-xl md:rounded-lg px-6 md:px-8 mt-7 md:mt-4">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-semibold text-default-800 mb-4">
              Final step, make the payment.
            </h3>
            <p className="text-default-800 font-normal text-medium">
              To finalize your appointment!
            </p>
            <p className="text-default-800 font-normal text-medium">
              Kindly complete your payment using a valid credit card
            </p>

            <div className="py-0">
              <Payment
                loading={loading}
                setLoading={setLoading}
                amount={parseInt(data?.service?.price)}
              />
            </div>
          </div>

          <div className="md:w-[45%] w-full flex justify-center md:justify-end">
            {!error && (
              <div className="flex w-[94%] flex-col md:pl-8">
                <h3 className="text-xl md:text-2xl font-semibold text-default-800 mb-4 md:mb-6">
                  Summary:
                </h3>
                {isLoading ? (
                  <Skeleton
                    className="w-full h-full rounded-lg"
                    disableAnimation
                  />
                ) : (
                  <div className="p-5 md:px-6 py-6 md:py-10 w-full rounded-lg bg-slate-50">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-medium md:text-lg font-medium">Date</p>
                      <span className="text-default-800 text-sm md:text-medium">
                        {moment(data?.appointment_date).format("MMMM D, YYYY")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-medium md:text-lg font-medium">Time</p>
                      <span className="text-default-800 text-sm md:text-medium">
                        {moment(data?.appointment_date).format("hh:mm A")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-medium md:text-lg font-medium">
                        Service
                      </p>
                      <div className="flex justify-end items-end text-right max-w-44 md:max-w-52">
                        <span className="text-default-800 text-sm md:text-medium">
                          {truncateText(
                            data?.service?.name,
                            isSmallDevice ? 12 : 30
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-9">
                      <div className="w-full border-1 border-gray-300 mt-4 rounded-full"></div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-default-800 md:text-medium font-medium">
                        Total Amount
                      </span>
                      <p className="text-lg md:text-2xl font-medium m-0">
                        ${data?.service?.price}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualAppointmentPayment;
