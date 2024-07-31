import React, { useEffect, useState } from "react";
import css from "./Dashboard.module.scss";
import profile1 from "../../assets/h3.jpg";
import ImageProfileComponent from "../ui/Image/ImageProfileComponent";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button, Skeleton } from "@nextui-org/react";
import { truncateText } from "../../utils/helpers/helpers";

const Business = ({ data, isLoading, error, refetchBusinesses }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

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

  return (
    <>
      <div
        className={`${css.business} lg:min-h-40 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-2`}
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
                className={css.card}
                onClick={() => navigate(`/businesses/${item.name}/${item.id}`)}
              >
                <div className={css.image}>
                  <ImageProfileComponent src={profile1} radius={"50%"} alt="" />
                </div>
                <div className={css.data}>
                  <div className={css.name}>{item.name}</div>
                  <div className={css.desc}>
                    {truncateText(item.description, 40)}
                  </div>
                  <div className={css.address}>
                    {truncateText(item.address, isSmallDevice ? 24 : 40)}
                  </div>
                </div>
              </div>
            ))}

        {/* Show Error If data fails to load  */}
        {!isLoading && error && (
          <div className="px-4 mx-auto w-full pt-14 h-[175px] flex flex-col gap-2 items-center">
            <p className="font-medium text-[15px] text-[#01abab]">
              Let's try this again.
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
