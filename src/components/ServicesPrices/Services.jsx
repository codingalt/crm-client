import React from 'react'
import css from "./Services.module.scss"
import Card from './Card';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const navigate = useNavigate();

  return (
    <div className={css.services}>
      <div className={css.headingTop}>
        <h1>Services and prices</h1>
        <div className={css.bottom}>
          <p>Existing Services</p>
          <button type="button" onClick={() => navigate("/newService")}>
            <FaPlus /> <span>Add service</span>
          </button>
        </div>
      </div>

      {/* Services Cards  */}
      <div
        className={`${css.cards} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5`}
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Services