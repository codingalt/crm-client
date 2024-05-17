import React, { useEffect, useState } from "react";
import css from "./BusinessProfile.module.scss";
import { RiFireFill } from "react-icons/ri";
import ImageComponent from "../ui/Image/ImageComponent";
import s1 from "../../assets/h3.jpg";
import { Skeleton } from "@nextui-org/react";

const Services = ({ data, isLoading, selectedService, setSelectedService }) => {
  return (
    <div
      className={`${css.cards} grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5`}
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
              onClick={() => setSelectedService(item)}
            >
              <div className={css.left}>
                <div className={css.name}>{item.name}</div>
                <div className={css.price}>Rs. {item.price}</div>
                <div className={css.desc}>
                  Fresh & fluffy pancakes. Served with a topping
                </div>
              </div>
              <div className={css.right}>
                <div className={css.img}>
                  <ImageComponent src={s1} radius={"8px"} />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Services;
