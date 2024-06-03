import React from "react";
import css from "./ViewService.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Skeleton } from "@nextui-org/react";
import { useGetServiceDetailsByIdQuery } from "../../services/api/servicesApi/servicesApi";
import ImageComponent from "../ui/Image/ImageComponent";
import { FaStar } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";

const ViewService = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  // Service Details
  const { data, isLoading } = useGetServiceDetailsByIdQuery(serviceId);
  const service = data?.service;

  const handleMakeAppointment = () => {
    if (!serviceId) {
      return;
    }

    navigate(`/makeAppointment/${service?.name}?service-id=${service?.id}`);
  };

  return (
    <div className={`${css.wrapper} max-w-screen-lg mx-auto`}>
      <div className={css.profileInfo}>
        <div className={css.left}>
          <div className={css.details}>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="w-48 rounded-lg">
                  <div className="h-4 w-full rounded-lg bg-secondary-300"></div>
                </Skeleton>

                <Skeleton className="w-72 rounded-lg">
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
                </div>
              </div>
            ) : (
              <>
                <div className={css.name}>{service?.name}</div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-x-2">
                    <IoIosTimer />
                    <span>{service?.time}minutes service</span>
                  </div>
                </div>
                <div className={css.rating}>
                  <FaStar color="#FFA534" />
                  <p>
                    {data?.rating}/5<span> (1000+)</span>
                  </p>
                  <button>See reviews</button>
                </div>

                <div className="text-2xl text-gray-600 font-medium">
                  Price: {service?.price} Nis
                </div>
              </>
            )}
          </div>
        </div>

        <div className={css.right}>
          <Button disabled={isLoading} onClick={handleMakeAppointment}>
            Make a new Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewService;
