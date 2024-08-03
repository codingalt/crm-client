import React, { useEffect, useState } from "react";
import css from "./Dashboard.module.scss";
import brand from "../../assets/brand.png";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button, Skeleton } from "@nextui-org/react";
import { truncateText } from "../../utils/helpers/helpers";
import ImagePlaceholder from "../ui/Image/ImagePlaceholder";
import { MdLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { BsChatLeftDots } from "react-icons/bs";
import { useApiErrorHandling } from "../../hooks/useApiErrors";
import { useOneOoneCommunicationQuery } from "@/services/api/chat/chatApi";

const Business = ({ data, isLoading, error, refetchBusinesses }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [chatWithOwner, setChatWithOwner] = useState(null);

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 1280px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 1281px) and (max-width : 1536px)"
  );
  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1537px)"
  );

  // oneOone Communication | Messages
  const {
    data: messagesData,
    isLoading: isLoadingChatWithProvider,
    error: errorChatWithProvider,
    isSuccess: isSuccessChatWithProvider,
  } = useOneOoneCommunicationQuery(
    { user_type: "client", receiver_id: chatWithOwner?.id },
    {
      skip: !chatWithOwner,
    }
  );

  useEffect(() => {
    isSmallDevice
      ? setValue(1)
      : isMediumDevice
      ? setValue(2)
      : isLargeDevice
      ? setValue(3)
      : isExtraLargeDevice
      ? setValue(3)
      : null;
  }, [isSmallDevice, isMediumDevice, isLargeDevice, isExtraLargeDevice]);

  const handleChatWithServiceProvider = (item) => {
    setChatWithOwner(item);
  };

  const apiErrors = useApiErrorHandling(errorChatWithProvider);

  useEffect(() => {
    if (isSuccessChatWithProvider && messagesData) {
      setChatWithOwner(null);
      navigate(`/chat?chatId=${messagesData?.communication?.id}`);
    }
  }, [isSuccessChatWithProvider, messagesData]);

  useEffect(() => {
    if(errorChatWithProvider){
      setChatWithOwner(null);
    }
  }, [errorChatWithProvider]);

  return (
    <>
      <div
        className={`${css.business} lg:min-h-40 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-2`}
      >
        {isLoading
          ? Array.from({ length: value }).map((_, index) => (
              <Skeleton key={index} className="rounded-lg h-40">
                <div className="w-full rounded-lg bg-secondary"></div>
              </Skeleton>
            ))
          : data?.map((item) => (
              <div
                key={item.id}
                className={`${css.card} bg-[#E1F4E2] bg-opacity-50 shadow`}
                onClick={() => navigate(`/businesses/${item.name}/${item.id}`)}
              >
                <div className={css.image}>
                  <ImagePlaceholder src={brand} radius="5px" />
                </div>
                <div className={css.data}>
                  <div className={css.name}>{item.name}</div>
                  <div className={css.address}>
                    <MdLocationOn />
                    <span>
                      {truncateText(item.address, isSmallDevice ? 24 : 40)}
                    </span>
                  </div>
                  <div className={css.rating}>
                    <FaStar color="#FFA534" />
                    <p>
                      {item.customer_rating_average}/5{" "}
                      <span className="text-xs text-default-500">({item.customer_rating_count})</span>
                    </p>
                    <Button
                      className="bg-transparent text-[#00AEAD] font-medium"
                      size="sm"
                      radius="sm"
                      startContent={
                        <BsChatLeftDots className="hidden md:block text-medium" />
                      }
                      isLoading={isLoadingChatWithProvider}
                      onClick={() => handleChatWithServiceProvider(item)}
                    >
                      {t("chatWithBusiness")}
                    </Button>
                  </div>
                </div>
              </div>
            ))}

        {/* Show Error If data fails to load  */}
        {!isLoading && error && (
          <div className="px-4 justify-center mx-auto w-full pt-14 h-[175px] flex flex-col gap-2 items-center">
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
              onClick={refetchBusinesses}
            >
              Try again
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Business;
