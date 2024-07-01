import React, { useState } from "react";
import css from "./PaymentMethod.module.scss";
import { Button } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa6";
import { useGetPaymentMethodsQuery } from "../../../services/api/businessProfileApi/businessProfileApi";
import { Skeleton } from "@mui/material";
import { MdErrorOutline } from "react-icons/md";
import { useMediaQuery } from "@uidotdev/usehooks";
import { iconMap } from "./Icons";

const PaymentMethod = ({
  paginate,
  handleBack,
  paymentMethod,
  setPaymentMethod,
}) => {
  const { data, isLoading, refetch,error } = useGetPaymentMethodsQuery();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const handleNext = () => {
    paginate(1);
  };

  return (
    <div className={css.paymentMethodWrapper}>
      <div
        className={`${css.heading} max-w-4xl mx-auto flex justify-between items-center`}
      >
        <div className={`${css.backButton} flex items-center gap-x-6`}>
          <div
            onClick={() => handleBack()}
            className="w-12 h-12 cursor-pointer hover:bg-default-50 transition-all text-lg border shadow-sm rounded-full flex items-center justify-center"
          >
            <FaArrowLeft />
          </div>
          <span className="flex-1">Payment Method</span>
        </div>
        {/* Next Button  */}
        <div className={`${css.nextButton} flex-1`}>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>

      <div
        className={`${css.methodCards} max-w-4xl px-0 md:px-8 flex flex-col md:flex-row gap-5 md:gap-9 items-center`}
      >
        {isLoading ? (
          <>
            <Skeleton
              variant="rounded"
              width={isSmallDevice ? "87%" : "100%"}
              height={isSmallDevice ? 111 : 163}
              sx={{ borderRadius: "10px" }}
            />
            <Skeleton
              variant="rounded"
              width={isSmallDevice ? "87%" : "100%"}
              height={isSmallDevice ? 111 : 163}
              sx={{ borderRadius: "10px" }}
            />
          </>
        ) : (
          <>
            {data?.paymentMethods?.map((item) => (
              <div
                key={item.id}
                className={`${css.card} ${
                  paymentMethod === item.code
                    ? "bg-[#01ABAB] hover:bg-[#01ABAB] text-white"
                    : "hover:bg-[#f7f7f7] text-[#3C3C3C]"
                }`}
                onClick={() => {
                  setPaymentMethod(item.code);
                }}
              >
                <div
                  className={`${
                    paymentMethod === item.code
                      ? "text-white"
                      : "text-[#01ABAB]"
                  }`}
                >
                  {iconMap[item.code]}
                </div>
                <p>{item.name}</p>
              </div>
            ))}
          </>
        )}

        {/* Error Message if Faied to fetch  */}
        {!isLoading && error && (
          <div className="flex flex-col gap-2 justify-center items-center mx-auto">
            <MdErrorOutline className="text-[#01ABAB] text-[35px]" />
            <p className="text-medium text-default-900 font-medium">
              Failed to fetch payment methods
            </p>
            <Button
              className="bg-[#01ABAB] text-white mt-4"
              onClick={() => refetch()}
            >
              Try again
            </Button>
          </div>
        )}
      </div>

      {/* Next Button Mobile  */}
      <div
        className={`${css.mobileBtn} flex md:hidden justify-center items-center`}
      >
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default PaymentMethod;
