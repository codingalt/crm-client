import React from "react";
import { CiDumbbell } from "react-icons/ci";
import { GiComb } from "react-icons/gi";
import { FaStethoscope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import css from "./SubCategories.module.scss";
import { FaNutritionix } from "react-icons/fa";

const Card = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={css.item}
        onClick={() => navigate(`/categories/Health/1`)}
      >
        <FaNutritionix />
        <p>Nutritional Supplements</p>
      </div>

      <div
        className={css.item}
        onClick={() => navigate(`/categories/Capacity/2`)}
      >
        <CiDumbbell />
        <p>Strength Training</p>
      </div>

      <div
        className={css.item}
        onClick={() => navigate(`/categories/Cultivation/3`)}
      >
        <GiComb />
        <p>Flexibility and Stretching</p>
      </div>
    </>
  );
};

export default Card;
