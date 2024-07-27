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

const BusinessProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { businessId } = useParams();
  const [selectedService, setSelectedService] = useState(null);
  const { data, isLoading } = useGetBusinessProfileQuery(businessId);
  const [res, setRes] = useState(null);
  console.log(data);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Please Select a Service",
      duration: 3
    });
  };

  useEffect(() => {
    if (data) {
      setRes(data.businesses);
    }
  }, [data]);

  const handleMakeAppointment = ()=>{
    if(!selectedService){
      openNotificationWithIcon('info');
      return;
    }

    navigate(
      `/makeAppointment/${selectedService?.name}?service-id=${selectedService?.id}`
    );
  }

  useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);

  return (
    <>
      {contextHolder}

      <div className={css.wrapper}>
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

          <div className={css.right}>
            {/* <Button disabled={isLoading} onClick={handleMakeAppointment}>
                {selectedService
                  ? `Make a $${selectedService.price} Appointment`
                  : "Make a new Appointment"}
              </Button> */}
          </div>
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
                <div className="px-6 py-0.5 bg-[#01AB8E] text-white flex items-center justify-center rounded-full">
                  {t("hours")}
                </div>
              </div>
              <OpeningHours />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessProfile;
