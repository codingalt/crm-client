import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./SubCategories.module.scss";
import ImagePlaceholder from "@/components/ui/imae-placeholder";

const Card = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${css.item} border hover:bg-gray-50 transition-all`}
      onClick={() => navigate(`/services/?subcategory_id=${item.id}`)}
    >
      <div className={css.image}>
        <ImagePlaceholder
          src={import.meta.env.VITE_SUB_CATEGORY_IMAGE + item?.image}
          rounded="md"
          width="100%"
          height="100%"
        />
      </div>
      <p>{item.name}</p>
    </div>
  );
};

export default Card;
