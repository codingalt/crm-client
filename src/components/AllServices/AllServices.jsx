import React from "react";
import css from "./AllServices.module.scss";
import { NumericFormat } from "react-number-format";
import { FaRegStar } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";
import ImagePlaceholder from "../ui/Image/ImagePlaceholder";
import { useNavigate, useParams } from "react-router-dom";
import { GrContactInfo } from "react-icons/gr";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { useTranslation } from "react-i18next";
import SortRow from "./SortRow";

const AllServices = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const { subCategoryId } = useParams();
    const cardArray = new Array(8).fill(null);

  return (
    <div className={`${css.wrapper} md:px-4 lg:px-6`}>
      {/* Sort By Row  */}
      <SortRow />

      {/* Services  */}
      <div
        className={`${css.services} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-7 gap-y-4 sm:gap-y-8`}
      >
        {cardArray.map((_, index) => (
          <div key={index} className={`${css.card}`}>
            <div className={css.image}>
              <ImagePlaceholder
                src={`https://new.premiuminventory.io/public/service-images/31722318946.jpg`}
                width={"100%"}
                height={"100%"}
                isZoomed
              />
            </div>
            <Tooltip
              placement="bottom-start"
              content="Content title"
              // hidden={item.name.length < 22}
              classNames={{
                base: [
                  // arrow color
                  "before:bg-black before:bg-opacity-60 before:rounded-[6px]",
                ],
                content: [
                  "py-1 px-2.5 shadow-lg rounded-[6px]",
                  "text-white text-[12px] bg-black bg-opacity-60",
                ],
              }}
            >
              {/* <div className={css.title}>{truncateText(item.name, 22)}</div> */}
              <div className={css.title}>Bridal Makeup</div>
            </Tooltip>
            <div className={css.rating}>
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
              <FaRegStar />
            </div>
            <div className={css.detail}>
              <div className={css.age}>
                <GrContactInfo />
                <span>
                  {/* {item.start_age}-{item.end_age} {t("yrs")}  */}
                  10-60 yrs
                </span>
              </div>
              <div className={css.time}>
                <LiaBusinessTimeSolid />
                <span>
                  {/* {item.time} {t("min")}  */}
                  30 mins
                </span>
              </div>
            </div>
            <div
              className={css.price}
              onClick={() => navigate(`/services/HairCut/1`)}
            >
              <span>
                From NIS{" "}
                <NumericFormat
                  displayType="text"
                  value={"23,421"}
                  thousandSeparator=","
                  thousandsGroupStyle="lakh"
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;
