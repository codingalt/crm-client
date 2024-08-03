import React from "react";
import css from "./BusinessProfile.module.scss";
import { Skeleton } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";
import {NumericFormat} from "react-number-format"
import ImagePlaceholder from "../ui/Image/ImagePlaceholder";

const Services = ({ data, isLoading, selectedService, setSelectedService }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${css.cards} grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-5`}
    >
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="rounded-lg h-40">
              <div className="w-full rounded-lg bg-secondary"></div>
            </Skeleton>
          ))
        : data?.services?.map((item) => (
            <div
              className={
                selectedService?.id === item.id
                  ? `${css.card} ${css.activeCard}`
                  : css.card
              }
              key={item.id}
              onClick={() => navigate(`/service/${item.name}/${item.id}`)}
            >
              <div className={css.left}>
                <div className={css.name}>{item.name}</div>
                <div className={css.price}>
                  <NumericFormat
                    displayType="text"
                    value={item.price}
                    thousandSeparator=","
                    suffix="Nis"
                    thousandsGroupStyle="lakh"
                  />
                </div>
                <div className={css.desc}>
                  Fresh & fluffy pancakes. Served with a topping
                </div>
              </div>
              <div className={css.right}>
                <div className={css.img}>
                  <ImagePlaceholder
                    src={import.meta.env.VITE_SERVICE_IMAGE + item.image}
                    width={"100%"}
                    height={"100%"}
                    isZoomed
                    radius={"8px"}
                  />
                </div>
              </div>
            </div>
          ))}

      {/* When No Service Available Empty state  */}
      {!isLoading && data?.services?.length === 0 && (
        <div className="w-full h-40 flex mt-20 md:mt-10">
          <Empty description={<span>No Services Available.</span>} />
        </div>
      )}
    </div>
  );
};

export default Services;
