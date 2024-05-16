import React from "react";
import css from "./SubCategories.module.scss";
import Card from "./Card";
import { useParams } from "react-router-dom";

const SubCategories = () => {
  const {categoryName} = useParams();

  return (
    <div className={css.wrapper}>
      <p className="text-medium font-medium my-2">
        Results for <span className="text-orange-400">"{categoryName}"</span> Category
      </p>

      <div
        className={`${css.subCategories} grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-x-5 gap-y-4`}
      >
        <Card />
      </div>
    </div>
  );
};

export default SubCategories;
