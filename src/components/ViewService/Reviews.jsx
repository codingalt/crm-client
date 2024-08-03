import React from "react";
import css from "./ViewService.module.scss";
import { Rating } from "@mui/material";
import { Avatar, Image } from "@nextui-org/react";
import h1 from "../../assets/h1.jpg";
import empty from "../../assets/emptyData.png";

const Reviews = () => {
  return (
    <div className={`${css.reviews} pb-10 md:pb-28`}>
      <h2 className="font-semibold text-xl md:text-2xl text-default-900 mt-4 mb-7 md:mb-8">
        Reviews from customers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-14 gap-y-14 sm:gap-y-20">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="relative shadow-sm border-1 border-gray-150 rounded-[10px] px-5 py-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold sm:text-lg">Awesome</p>
              <Rating name="read-only" value={5} size="small" readOnly />
            </div>

            <div className="w-full text-default-900 text-xs md:text-sm font-normal mt-3">
              <p>
                We pride ourselves on offering the latest and greatest in camera
                technology at unbeatable prices. Our dedicated team of experts
                is always available to provide personalized advice and support.
              </p>
            </div>

            {/* User Profile  */}
            <div className="absolute -bottom-7 right-8">
              <div className="flex h-12 gap-3 md:gap-4">
                <p className="mb-0 md:-mb-0.5 text-sm md:text-medium truncate mt-auto font-medium text-default-900">
                  Faheem Malik
                </p>
                <div className="rounded-full shadow-2xl">
                  <Avatar
                    isBordered
                    color="success"
                    src={h1}
                    className="shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Message   */}
      <div className="w-full px-2 md:px-0 pt-14 pb-12 md:pb-4 md:pt-10 hidden items-center justify-center flex-col">
        <div className="w-14">
          <Image src={empty} radius="none" />
        </div>

        <p className="text-medium text-gray-700 font-medium mt-2.5">
          Not rated yet.
        </p>
        <p className="max-w-[290px] md:max-w-xs text-default-500 font-normal text-xs md:text-sm text-center mt-1">
          Reviews for this business profile will be displayed here once
          available.
        </p>
      </div>
    </div>
  );
};

export default Reviews;
