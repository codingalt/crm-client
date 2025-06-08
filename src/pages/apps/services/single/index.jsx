import React, { useEffect, useState } from "react";
import css from "./ViewService.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useGetServiceDetailsByIdQuery } from "@/services/api/servicesApi/servicesApi";
import { IoIosTimer } from "react-icons/io";
import { Rating } from "@mui/material";
import {Skeleton} from "@/components/ui/skeleton";
import { BsChatLeftDots } from "react-icons/bs";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MdOutlinePriceChange } from "react-icons/md";
import { BiGroup } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { truncateText } from "@/utils/helpers/helpers";
import { useOneOoneCommunicationQuery } from "@/services/api/chat/chatApi";
import { useApiErrorHandling } from "@/hooks/useApiErrors";
import ImagePlaceholder from "@/components/ui/imae-placeholder";
import Reviews from "./Reviews";
import ClipSpinner from "@/components/common/loaders/ClipSpinner";

const ViewSingleServicePage = () => {
  const { t } = useTranslation();
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");
  const [chatWithOwner, setChatWithOwner] = useState(false);

  // Service Details
  const { data, isLoading, error,isFetching, refetch } =
    useGetServiceDetailsByIdQuery(serviceId);
  const service = data?.service;

  const props = {
    user_type: "client",
    receiver_id: service?.business_id,
  };

  // oneOone Communication | Messages
  const {
    data: messagesData,
    isLoading: isLoadingChatWithProvider,
    error: errorChatWithProvider,
    isSuccess: isSuccessChatWithProvider,
  } = useOneOoneCommunicationQuery(props, {
    skip: !chatWithOwner,
  });

  const handleChatWithServiceProvider = () => {
    setChatWithOwner(true);
  };

  const apiErrors = useApiErrorHandling(errorChatWithProvider);

  useEffect(() => {
    if (isSuccessChatWithProvider && messagesData) {
      navigate(`/chat?chatId=${messagesData?.communication?.id}`);
    }
  }, [isSuccessChatWithProvider, messagesData]);

  const handleMakeAppointment = () => {
    if (!serviceId) {
      return;
    }

    navigate(
      service && `/makeAppointment/${service?.name}?service-id=${service?.id}`
    );
  };

  return (
    <div className={css.wrapper}>
      {/* Show Error if failed to load data  */}
      {!isLoading && error && (
        <div className="px-4 mx-auto w-full pt-40 flex flex-col gap-2 items-center">
          <p className="font-medium text-[15px] text-[#01abab]">
            Let's try that again.
          </p>
          <span className="px-6 text-xs text-default-600 text-center max-w-xs">
            Oops! Something went wrong. We couldn't fetch the data.
          </span>
          <Button
            size="sm"
            radius="sm"
            className="mt-2 px-6 text-white bg-[#01abab]"
            onClick={refetch}
          >
            Try again
          </Button>
        </div>
      )}
      {error && (isLoading || isFetching) && (
        <div className="px-4 mx-auto w-full pt-40 flex flex-col gap-2 items-center">
          <ClipSpinner size={isSmallDevice ? 36 : 43} />
        </div>
      )}
      {!error && (
        <div className="w-full lg:max-w-screen-xl mx-auto lg:px-3 md:h-screen md:pt-0 px-1">
          {/* Card  */}
          <div className="mt-4 md:mt-0">
            <div className="flex gap-x-7 flex-col md:flex-row">
              {/* Left Side  */}
              <div className="w-full bg-default-100 flex items-center justify-center relative max-h-48 md:h-96 lg:max-h-96 rounded-md flex-1 shrink-0 overflow-hidden">
                {isLoading ? (
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={
                      isSmallDevice
                        ? "192px"
                        : isLargeDevice
                        ? "384px"
                        : "288px"
                    }
                    sx={{ borderRadius: "6px", objectFit: "cover" }}
                    animation={false}
                  />
                ) : (
                  <ImagePlaceholder
                    src={import.meta.env.VITE_SERVICE_IMAGE + service?.image}
                    width={"100%"}
                    height={"100%"}
                    alt={service?.name}
                    radius="md"
                    className="object-cover align-middle h-full"
                  />
                )}

                {/* Service Details over Image | Overlay  */}
                {data && (
                  <div className="absolute hidden left-0 right-0 bottom-0 bg-black bg-opacity-45 py-1.5 md:py-2.5 px-3.5 md:px-5 z-10">
                    <p className="text-white font-medium text-sm md:text-lg xl:text-xl">
                      {service?.name}
                    </p>
                    <Rating size="small" name="read-only" value={4} readOnly />
                  </div>
                )}
              </div>

              {/* Right Side  */}
              <div className="flex-1 mt-2 md:mt-0">
                <div className="flex flex-col lg:pl-2">
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      width={"130px"}
                      sx={{ fontSize: "20px" }}
                      animation={false}
                    />
                  ) : (
                    <p className="font-medium text-tiny mb-0 lg:mb-1 md:text-sm lg:text-medium text-default-400 uppercase">
                      {service?.category?.name}
                    </p>
                  )}
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "36px" }}
                      width={"90%"}
                      animation={false}
                    />
                  ) : (
                    <h3 className="text-2xl md:max-w-[92%] md:text-2xl lg:text-3xl xl:text-4xl font-bold text-default-800">
                      {truncateText(`${service?.name}`, 40)}
                    </h3>
                  )}

                  {/* Rating  */}
                  <div className="flex gap-x-2 md:gap-x-3 items-center mt-1 md:mt-1 lg:mt-3">
                    {isLoading ? (
                      <Skeleton
                        variant="text"
                        width={"200px"}
                        sx={{ fontSize: "18px" }}
                        animation={false}
                      />
                    ) : (
                      <>
                        <Rating
                          size={isSmallDevice ? "small" : "medium"}
                          name="read-only"
                          value={data?.rating}
                          readOnly
                        />
                        <p className="text-default-500 font-medium text-sm md:text-medium mt-0.5 md:mt-1">
                          {data?.rating} (328 {t("reviews")})
                        </p>
                      </>
                    )}
                  </div>

                  {/* Details  */}
                  {isLoading ? (
                    <div className="grid gap-x-3.5 md:gap-x-0 grid-cols-3 md:grid-cols-3 w-full md:w-[90%] mt-1 md:mt-4 lg:mt-7 px-0 md:px-6 rounded-lg pt-4 md:pt-6 pb-4 md:pb-6">
                      <div className="flex items-start md:items-start py-0 pb-1 md:py-0 rounded-lg flex-col w-fit gap-1">
                        <Skeleton
                          variant="text"
                          width={isSmallDevice ? "55px" : "85px"}
                          animation={false}
                        />
                        <Skeleton
                          variant="text"
                          width={isSmallDevice ? "90px" : "130px"}
                          animation={false}
                        />
                      </div>

                      <div className="flex items-start md:items-start py-0 pb-1 md:py-0 rounded-lg flex-col w-fit gap-1">
                        <Skeleton
                          variant="text"
                          width={isSmallDevice ? "55px" : "85px"}
                          animation={false}
                        />
                        <Skeleton
                          variant="text"
                          width={isSmallDevice ? "90px" : "130px"}
                          animation={false}
                        />
                      </div>

                      <div className="flex items-start md:items-start py-0 pb-1 md:py-0 rounded-lg flex-col w-fit gap-1">
                        <Skeleton
                          variant="text"
                          width={isSmallDevice ? "55px" : "85px"}
                          animation={false}
                        />
                        <Skeleton
                          variant="text"
                          width={isSmallDevice ? "90px" : "130px"}
                          animation={false}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-x-3.5 md:gap-x-0 grid-cols-3 md:grid-cols-3 w-full md:w-[90%] mt-0.5 md:mt-4 lg:mt-7 px-0 md:px-6 rounded-lg pt-4 md:pt-6 pb-4 md:pb-6 bg-transparent md:bg-green-50">
                      <div className="flex items-start md:items-start py-0 pb-1 md:py-0 rounded-lg flex-col w-fit gap-1 md:bg-transparent">
                        <IoIosTimer className="text-[#065F46] text-2xl md:text-3xl mx-auto" />

                        <span className="text-sm md:text-medium text-default-900 font-semibold">
                          {service?.time} {t("min")}
                        </span>
                        <p className="text-sm text-[#065F46] md:text-default-500 font-medium uppercase hidden">
                          Time
                        </p>
                      </div>

                      <div className="flex items-start md:items-start py-0 pb-1 md:py-0 rounded-lg flex-col w-fit gap-1 md:bg-transparent">
                        <MdOutlinePriceChange className="text-[#065F46] text-2xl md:text-3xl mx-auto" />
                        <p className="text-sm text-[#065F46] md:text-default-500 font-medium uppercase hidden">
                          {t("price")}
                        </p>
                        <span className="text-sm md:text-medium text-default-900 font-semibold">
                          <NumericFormat
                            displayType="text"
                            value={service?.price}
                            thousandSeparator=","
                            suffix="Nis"
                            thousandsGroupStyle="lakh"
                          />
                        </span>
                      </div>

                      <div className="flex items-start md:items-start py-0 pb-1 md:py-0 rounded-lg flex-col w-fit gap-1 md:bg-transparent">
                        <BiGroup className="text-[#065F46] text-2xl md:text-3xl mx-auto" />
                        <p className="text-sm text-[#065F46] md:text-default-500 font-medium uppercase hidden">
                          Age
                        </p>
                        <span className="text-sm md:text-medium text-default-900 font-semibold">
                          {service?.start_age}-{service?.end_age} {t("yrs")}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Chat Button  */}
                  <div className=" pt-1 pb-0 md:pt-1 md:pb-0 lg:py-3">
                    {isLoading ? (
                      <Skeleton
                        variant="text"
                        width={isSmallDevice ? "240px" : "230px"}
                        sx={{ fontSize: "20px" }}
                        animation={false}
                      />
                    ) : (
                      <Button
                        className="-ml-4 bg-transparent text-[#01ABAB] font-semibold"
                        size="lg"
                        radius="sm"
                        startContent={<BsChatLeftDots className="text-lg" />}
                        isLoading={isLoadingChatWithProvider}
                        onClick={handleChatWithServiceProvider}
                      >
                        <p>{t("chatWithServiceProvider")}</p>
                      </Button>
                    )}
                  </div>

                  {/* Make Appointment Button  */}
                  <div className="pt-6 lg:pt-2.5">
                    {isLoading ? (
                      <Skeleton
                        width={isSmallDevice ? "100%" : "90%"}
                        height={isSmallDevice ? "85px" : "100px"}
                        sx={{
                          borderRadius: "8px",
                          mt: isSmallDevice ? "-15px" : "-10px",
                        }}
                        animation={false}
                      />
                    ) : (
                      <Button
                        className="bg-[#01ABAB] mt-0 md:mt-0 py-4 md:py-4 lg:py-7 w-full md:w-[90%] text-white text-medium lg:text-xl font-semibold"
                        size="lg"
                        radius="full"
                        disabled={isLoading}
                        onClick={handleMakeAppointment}
                      >
                        <p>
                          <NumericFormat
                            displayType="text"
                            value={service?.price}
                            thousandSeparator=","
                            thousandsGroupStyle="lakh"
                          />{" "}
                          {t("makeAppointment")}
                        </p>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider  */}
          <div className="w-full border mt-7 md:mt-16 mb-4 md:mb-6"></div>

          {/* Reviews  */}
          <Reviews data={data?.reviews} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default ViewSingleServicePage;
