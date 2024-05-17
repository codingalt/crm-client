import React, { useEffect, useState } from "react";
import css from "./Dashboard.module.scss";
import profile1 from "../../assets/h3.jpg";
import ImageProfileComponent from "../ui/Image/ImageProfileComponent";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Skeleton } from "@nextui-org/react";

const Business = ({data, isLoading}) => {
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
      ? setValue(4)
      : null;
  }, [isSmallDevice, isMediumDevice, isLargeDevice, isExtraLargeDevice]);

  return (
    <div
      className={`${css.business} lg:min-h-40 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-5 gap-y-2`}
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
                  {item.description.length > 30
                    ? `${item.description.slice(0, 30)}..`
                    : item.description}
                </div>
                <div className={css.address}>
                  {item.address.length > 30
                    ? `${item.address.slice(0, 30)}..`
                    : item.address}
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Business;
