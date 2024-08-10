import React, { useEffect, useMemo, useState } from "react";
import css from "./BusinessProfile.module.scss";
import ImageComponent from "../ui/Image/ImageComponent";
import brand from "../../assets/brand.png";
import { MdLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Services from "./Services";
import { FaFire } from "react-icons/fa";
import OpeningHours from "./OpeningHours";
import { useGetBusinessProfileQuery } from "../../services/api/businessProfileApi/businessProfileApi";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Skeleton } from "@nextui-org/react";
import { notification, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import ClipSpinner from "../Loader/ClipSpinner";
import { useMediaQuery } from "@uidotdev/usehooks";

const BusinessProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const { businessId } = useParams();
  const [selectedService, setSelectedService] = useState(null);
  const { data, isLoading, error, isFetching, refetch } =
    useGetBusinessProfileQuery(businessId);
  const [res, setRes] = useState(null);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Please Select a Service",
      duration: 3,
    });
  };

  useEffect(() => {
    if (data) {
      setRes(data.business);
    }
  }, [data]);

  const handleMakeAppointment = () => {
    if (!selectedService) {
      openNotificationWithIcon("info");
      return;
    }

    navigate(
      `/makeAppointment/${selectedService?.name}?service-id=${selectedService?.id}`
    );
  };

  useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);

  return (
    <>
      {contextHolder}

      <div className={css.wrapper}>
        {!error && (
          <>
            <div className={css.profileInfo}>
              <div className={css.left}>
                <div className={css.image}>
                  <ImageComponent src={brand} />
                </div>

                <div className={css.details}>
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="w-48 rounded-lg">
                        <div className="h-4 w-full rounded-lg bg-secondary-300"></div>
                      </Skeleton>

                      <Skeleton className="w-72 rounded-lg">
                        <div className="h-4 w-full rounded-lg bg-secondary-300"></div>
                      </Skeleton>

                      <div className="w-72 flex space-x-3">
                        <Skeleton className="w-10 rounded-lg">
                          <div className="h-8 w-full rounded-lg bg-secondary-300"></div>
                        </Skeleton>

                        <Skeleton className="w-20 rounded-lg">
                          <div className="h-8 w-full rounded-lg bg-secondary-300"></div>
                        </Skeleton>

                        <Skeleton className="w-36 rounded-lg">
                          <div className="h-8 w-full rounded-lg bg-secondary-300"></div>
                        </Skeleton>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={css.name}>{res?.name}</div>
                      <div className={css.address}>
                        <MdLocationOn />
                        <span>{res?.address}</span>
                      </div>
                      <div className={css.rating}>
                        <FaStar color="#FFA534" />
                        <p>
                          4.1/5<span> (1000+)</span>
                        </p>
                        <button>{t("seeReviews")}</button>
                        <button className={css.moreInfo}>
                          <IoMdInformationCircleOutline /> {t("moreInfo")}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className={css.right}></div>
            </div>

            {/* Services  */}
            <div className={css.servicesWrapper}>
              <div className="w-[84%] flex items-center justify-between">
                <div className={css.title}>
                  <h1>
                    <FaFire /> {t("availableServices")}
                  </h1>
                </div>
              </div>

              <div className={css.services}>
                <div className={css.left}>
                  <Services
                    data={res}
                    isLoading={isLoading}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                  />
                </div>
                <div className={`${css.right} -mt-12`}>
                  <div
                    className={`${css.title} mb-4 w-full flex items-center justify-between`}
                  >
                    <h1>{t("openingHours")}</h1>
                    <div className="px-6 py-0.5 bg-[#01AB8E] text-white hidden lg:flex items-center justify-center rounded-full">
                      {t("hours")}
                    </div>
                  </div>
                  <OpeningHours data={data} isLoading={isLoading} />
                </div>
              </div>
            </div>
          </>
        )}

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
      </div>
    </>
  );
};

export default BusinessProfile;
