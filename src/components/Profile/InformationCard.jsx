import React from "react";
import { RiEditFill } from "react-icons/ri";
import profileVector from "../../assets/profileVector.svg";
import { Button, Image, Skeleton } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useMainContext } from "../../context/MainContext";
import UpdateInfoCard from "./UpdateInfoCard";

const InformationCard = ({
  data,
  isLoading,
  error,
  refetch,
  isEditProfile,
  setIsEditProfile,
  isLoadingBasicInfo,
  updateBasicInfo,
}) => {
  const { onOpenLocationModal } = useMainContext();

  return (
    <div className="w-full max-w-screen-xl mt-7 sm:mt-9 border rounded-xl py-6 sm:py-9 px-5 sm:px-14">
      <div className="flex gap-3 items-center mb-5 sm:mb-0">
        <h2 className="text-xl sm:text-2xl font-medium">Basic Information</h2>
        <Tooltip title="Edit profile" placement="right">
          <div
            onClick={() => !isLoading && !error && setIsEditProfile(true)}
            className="w-10 h-10 transition-all rounded-full flex items-center justify-center hover:bg-slate-100"
          >
            {!isEditProfile && (
              <RiEditFill className="text-[#01abab] text-2xl cursor-pointer" />
            )}
          </div>
        </Tooltip>
      </div>

      <div className="flex items-center">
        {/* Left Side  */}
        {isEditProfile ? (
          <UpdateInfoCard
            data={data}
            setIsEditProfile={setIsEditProfile}
            isLoadingBasicInfo={isLoadingBasicInfo}
            updateBasicInfo={updateBasicInfo}
          />
        ) : !error ? (
          <div className="flex flex-col flex-1">
            <div className="flex flex-col gap-1 mb-7">
              <p className="text-sm font-normal text-[#3C3C3C]">Name</p>
              {isLoading ? (
                <Skeleton className="h-4 w-[70%] rounded-md mt-1" />
              ) : (
                <p className="text-lg sm:text-xl font-normal capitalize">
                  {data?.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 mb-7">
              <p className="text-sm font-normal text-[#3C3C3C]">Email</p>
              {isLoading ? (
                <Skeleton className="h-4 w-[70%] rounded-md mt-1" />
              ) : (
                <p className="text-lg sm:text-xl font-normal capitalize">
                  {data?.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 mb-7">
              <p className="text-sm font-normal text-[#3C3C3C]">Gender</p>
              {isLoading ? (
                <Skeleton className="h-4 w-[70%] rounded-md mt-1" />
              ) : (
                <p className="text-lg sm:text-xl font-normal capitalize">
                  {data?.gender}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 mb-7 max-w-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-normal text-[#3C3C3C]">Address</p>
                {!isLoading && (
                  <NavLink
                    to={"#"}
                    className="text-[#01abab] text-sm underline mr-1"
                    variant="light"
                    onClick={onOpenLocationModal}
                  >
                    Change Address
                  </NavLink>
                )}
              </div>

              {isLoading ? (
                <Skeleton className="h-4 w-full rounded-md mt-1.5" />
              ) : (
                <p className="text-lg sm:text-xl mt-1.5 font-normal">
                  115, Block C Multan, Punjab, Pakistan
                </p>
              )}
            </div>
          </div>
        ) : (
          !isLoading &&
          error && (
            <div className="px-4 mx-auto w-full my-14 flex flex-col gap-2 items-center">
              <p className="font-medium text-[15px] text-[#01abab]">
                Let's try that again.
              </p>
              <span className="px-6 text-xs text-default-600 text-center max-w-xs">
                OOps! Something went wrong. We couldn't fetch the data.
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
          )
        )}

        {/* Right Side  */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <Image
              src={profileVector}
              loading="lazy"
              className="w-full"
              radius="none"
            />
          </div>
      </div>
    </div>
  );
};

export default InformationCard;
