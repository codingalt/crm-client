import React from "react";
import css from "./AllServices.module.scss";
import { NumericFormat } from "react-number-format";
import { Button, Tooltip } from "@nextui-org/react";
import ImagePlaceholder from "../ui/Image/ImagePlaceholder";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrContactInfo } from "react-icons/gr";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { useTranslation } from "react-i18next";
import SortRow from "./SortRow";
import { useGetServicesBySubCategoryIdQuery } from "../../services/api/servicesApi/servicesApi";
import ServiceSkeleton from "./ServiceSkeleton";
import { truncateText } from "../../utils/helpers/helpers";
import { Rating } from "@mui/material";
import { RiMenuSearchLine } from "react-icons/ri";

const AllServices = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { subCategoryId } = useParams();

  const { data, isLoading, error,refetch } =
    useGetServicesBySubCategoryIdQuery(subCategoryId);

  return (
    <div className={`${css.wrapper} md:px-4 lg:px-6`}>
      {/* Sort By Row  */}
      <SortRow
        isLoading={isLoading}
        error={error}
        dataLength={data?.services?.length}
      />

      {/* Services  */}
      {/* <div
        className={`${css.services} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-7 gap-y-4 sm:gap-y-8`}
      >
        {isLoading ? (
          <ServiceSkeleton />
        ) : (
          data?.services?.map((item) => (
            <Link to={`/service/${item.name}/${item.id}`} key={item.id}>
              <div className={`${css.card}`}>
                <div className={css.image}>
                  <ImagePlaceholder
                    src={import.meta.env.VITE_SERVICE_IMAGE + item.image}
                    width={"100%"}
                    height={"100%"}
                    isZoomed
                  />
                </div>
                <Tooltip
                  placement="bottom-start"
                  content={item.name}
                  hidden={item.name.length < 22}
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
                  <div className={css.title}>{truncateText(item.name, 22)}</div>
                </Tooltip>
                <div className={css.rating}>
                  <Rating
                    value={item.rating}
                    readOnly
                    size="small"
                    sx={{ fontSize: "1.1rem" }}
                  />
                </div>
                <div className={css.detail}>
                  <div className={css.age}>
                    <GrContactInfo />
                    <span>
                      {item.start_age}-{item.end_age} {t("yrs")}
                    </span>
                  </div>
                  <div className={css.time}>
                    <LiaBusinessTimeSolid />
                    <span>
                      {item.time} {t("min")}
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
            </Link>
          ))
        )}
      </div> */}

      {/* Show Error If data fails to load  */}
      {!isLoading && error && (
        <div className="px-4 mx-auto w-full py-28 flex flex-col gap-2 items-center">
          <p className="font-medium text-[17px] text-[#01abab]">
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

      {/* Empty Data  */}
      {!isLoading && data?.services?.length != 0 && (
        <div className="w-full max-w-md m-auto mt-24 md:mt-24">
          <div className="flex gap-2 items-start md:items-center justify-center w-full text-default-600">
            <RiMenuSearchLine className="text-[20px] md:text-[22px]" />
            <p className="text-[16px] md:text-[18px] font-normal md:font-medium flex flex-col justify-center items-center gap-0.5">
              <span>No Services Found</span>
            </p>
          </div>
          <p className="text-sm mt-1 mb-1 font-light mx-auto text-center text-default-500 max-w-xs">
            We're sorry, but it looks like there are no services available at
            the moment.
          </p>
          <p
            onClick={() =>
              navigate(
                `/categories/${data?.services?.name}/${data?.services?.id}`
              )
            }
            className="text-[#01ABAB] mt-3 cursor-pointer text-[15px] md:text-[18px] font-normal md:font-medium flex flex-col justify-center items-center gap-0.5"
          >
            Discover More
          </p>
        </div>
      )}
    </div>
  );
};

export default AllServices;
