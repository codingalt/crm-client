import React from "react";
import css from "./Dashboard.module.scss";
import profile1 from "../../assets/h3.jpg";
import profile2 from "../../assets/h1.jpg";
import profile3 from "../../assets/h2.jpg";
import ImageProfileComponent from "../ui/Image/ImageProfileComponent";
import { useNavigate } from "react-router-dom";

const Business = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`${css.business} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-5 gap-y-2`}
    >
      <div
        className={css.card}
        onClick={() => navigate(`/businesses/Codes Manufactory/1`)}
      >
        <div className={css.image}>
          <ImageProfileComponent src={profile1} radius={"50%"} alt="" />
        </div>
        <div className={css.data}>
          <div className={css.name}>Codes Manufactory</div>
          <div className={css.desc}>Description will goes here..</div>
          <div className={css.address}>Northern Bypass Bossan Road, Multan</div>
        </div>
      </div>

      <div
        className={css.card}
        onClick={() => navigate(`/businesses/Codes Manufactory/1`)}
      >
        <div className={css.image}>
          <ImageProfileComponent src={profile2} radius={"50%"} alt="" />
        </div>
        <div className={css.data}>
          <div className={css.name}>Lesoft</div>
          <div className={css.desc}>Description will goes here..</div>
          <div className={css.address}>Timber Market cantt, Multan</div>
        </div>
      </div>

      <div
        className={css.card}
        onClick={() => navigate(`/businesses/Codes Manufactory/1`)}
      >
        <div className={css.image}>
          <ImageProfileComponent src={profile3} radius={"50%"} alt="" />
        </div>
        <div className={css.data}>
          <div className={css.name}>Blue Cascade</div>
          <div className={css.desc}>Description will goes here..</div>
          <div className={css.address}>Northern Bypass Bossan Road, Multan</div>
        </div>
      </div>
    </div>
  );
};

export default Business;
