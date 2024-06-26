import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./SubCategories.module.scss";
import ImageComponent from "../ui/Image/ImageComponent";

const colors = [
  "#E7F9F3",
  "#FFF6DD",
  "#E7EBF9",
  "#ECF2F9",
  "#ECF2F9",
  "#E6F4F6",
];

const Card = ({ item, index }) => {
  const navigate = useNavigate();

  return (
    <div
      className={css.item}
      style={{ background: colors[index % colors.length] }}
      onClick={() => navigate(`/categories/${item.name}/${item.id}`)}
    >
      <div className={css.image}>
        <ImageComponent
          src={import.meta.env.VITE_SUB_CATEGORY_IMAGE + item?.image}
          radius={"8px"}
        />
      </div>
      <p>{item.name}</p>
    </div>
  );
};

export default Card;
