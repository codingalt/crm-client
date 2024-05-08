import React from 'react'
import css from "./Services.module.scss"
import Card from './Card';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useGetServicesQuery } from '../../services/api/servicesApi/servicesApi';
import { ClipLoader } from 'react-spinners';

const Services = () => {
    const navigate = useNavigate();
    const { data,isLoading } = useGetServicesQuery();
  console.log(data);
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

      {/* Loader  */}
      {isLoading && (
        <div className="w-full h-[60%] flex items-center justify-center">
          <ClipLoader color="#01AB8E" size={44} speedMultiplier={0.85} />
        </div>
      )}

      {/* Services Cards  */}
      <div
        className={`${css.cards} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5`}
      >
        {!isLoading && data?.services?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Services