import React from "react";
import css from "./ViewService.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Image } from "@nextui-org/react";
import { useGetServiceDetailsByIdQuery } from "../../services/api/servicesApi/servicesApi";
import ImageComponent from "../ui/Image/ImageComponent";
import { FaStar } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import serviceImg from "../../assets/h3.jpg";
import { Rating, Skeleton } from "@mui/material";
import moment from "moment";
import { BsChatLeftDots } from "react-icons/bs";
import { useMediaQuery } from "@uidotdev/usehooks";
import { MdOutlinePriceChange } from "react-icons/md";
import { MdOutlineGroups } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { BiGroup } from "react-icons/bi";

const ViewService = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  // Service Details
  const { data, isLoading } = useGetServiceDetailsByIdQuery(serviceId);
  const service = data?.service;

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
      <div className="w-full lg:max-w-screen-xl md:h-screen md:pt-0 px-1">
        {/* Card  */}
        <div className="mt-5 md:mt-0">
          <div className="flex gap-x-8 flex-col md:flex-row">
            {/* Left Side  */}
            <div className="w-full relative max-h-48 md:max-h-72 lg:max-h-96 rounded-md flex-1 shrink-0 overflow-hidden">
              <Image
                src={serviceImg}
                width={"100%"}
                height={"100%"}
                alt="Service Image"
                radius="md"
                className="object-cover align-middle h-full"
              />

              {/* Service Details over Image | Overlay  */}
              {data && (
                <div className="absolute left-0 right-0 bottom-0 bg-black bg-opacity-45 py-1.5 md:py-2.5 px-3.5 md:px-5 z-10">
                  <p className="text-white font-medium text-sm md:text-lg xl:text-xl">
                    {service?.name}
                  </p>
                  <Rating size="small" name="read-only" value={5} readOnly />
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
                  <p className="font-medium text-sm mb-0 lg:mb-1 md:text-sm lg:text-medium text-default-400 uppercase">
                    Bedroom
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
                  <h3 className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-default-800">
                    {service?.name}
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
                        value={4}
                        readOnly
                      />
                      <p className="text-default-500 font-medium text-sm md:text-medium mt-0.5 md:mt-1">
                        4.4 (328 reviews)
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
                  <div className="grid gap-x-3.5 md:gap-x-0 grid-cols-3 md:grid-cols-3 w-full md:w-[90%] mt-1 md:mt-4 lg:mt-7 px-0 md:px-6 rounded-lg pt-4 md:pt-6 pb-4 md:pb-6 bg-transparent md:bg-green-50">
                    <div className="flex items-start md:items-start py-0 pb-1 md:py-0 rounded-lg flex-col w-fit gap-1 md:bg-transparent bg-[#D1FAE5]">
                      <IoIosTimer className="text-[#065F46] text-2xl md:text-3xl mx-auto" />

                      <span className="text-sm md:text-medium text-default-900 font-semibold">
                        {service?.time} min
                      </span>
                      <p className="text-sm text-[#065F46] md:text-default-500 font-medium uppercase hidden">
                        Time
                      </p>
                    </div>

                    <div className="flex items-start md:items-start py-0 pb-1 md:py-0 rounded-lg flex-col w-fit gap-1 md:bg-transparent bg-[#FCE7F3]">
                      <MdOutlinePriceChange className="text-[#065F46] text-2xl md:text-3xl mx-auto" />
                      <p className="text-sm text-[#065F46] md:text-default-500 font-medium uppercase hidden">
                        Price
                      </p>
                      <span className="text-sm md:text-medium text-default-900 font-semibold">
                        {service?.price} Nis
                      </span>
                    </div>

                    <div className="flex items-start md:items-start py-0 pb-1 md:py-0 rounded-lg flex-col w-fit gap-1 md:bg-transparent bg-[#FFEDD5]">
                      <BiGroup className="text-[#065F46] text-2xl md:text-3xl mx-auto" />
                      <p className="text-sm text-[#065F46] md:text-default-500 font-medium uppercase hidden">
                        Age
                      </p>
                      <span className="text-sm md:text-medium text-default-900 font-semibold">
                        {service?.start_age}-{service?.end_age} yrs
                      </span>
                    </div>
                  </div>
                )}

                {/* Chat Button  */}
                <div className=" py-0 md:py-1 lg:py-3">
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
                    >
                      <p>Chat with Service Provider</p>
                    </Button>
                  )}
                </div>

                {/* Make Appointment Button  */}
                <div className="pt-4 md:pt-0.5 lg:pt-3">
                  {isLoading ? (
                    <Skeleton
                      width={isSmallDevice ? "100%" : "90%"}
                      height={isSmallDevice ? "85px" : "100px"}
                      sx={{ borderRadius: "41px", mt: isSmallDevice ? "-15px" : "-10px" }}
                      animation={false}
                    />
                  ) : (
                    <Button
                      className="bg-[#01ABAB] py-4 md:py-5 lg:py-7 w-full md:w-[90%] text-white text-medium lg:text-xl font-semibold"
                      size="lg"
                      radius="full"
                      disabled={isLoading}
                      onClick={handleMakeAppointment}
                    >
                      <p>${service?.price} Make Appointment</p>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewService;
