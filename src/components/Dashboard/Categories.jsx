import React from 'react'
import css from "./Dashboard.module.scss";
import { CiDumbbell } from "react-icons/ci";
import { LuDumbbell } from "react-icons/lu";
import { GiComb } from "react-icons/gi";
import { FaStethoscope } from "react-icons/fa";
import {useNavigate} from "react-router-dom"

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`${css.categories} grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-x-5 gap-y-4`}
    >
      <div
        className={css.item}
        onClick={() => navigate(`/categories/Health/1`)}
      >
        <FaStethoscope />
        <p>Health</p>
      </div>

      <div
        className={css.item}
        onClick={() => navigate(`/categories/Capacity/2`)}
      >
        <CiDumbbell />
        <p>Capacity</p>
      </div>

      <div
        className={css.item}
        onClick={() => navigate(`/categories/Cultivation/3`)}
      >
        <GiComb />
        <p>Cultivation</p>
      </div>
    </div>
  );
}

export default Categories