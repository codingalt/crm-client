import React from "react";
import css from "./BusinessProfile.module.scss";
import ImageComponent from "../ui/Image/ImageComponent";
import brand from "../../assets/brand.png";
import { MdLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Services from "./Services";
import { FaFire } from "react-icons/fa";
import OpeningHours from "./OpeningHours";

const BusinessProfile = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.profileInfo}>
        <div className={css.left}>
          <div className={css.image}>
            <ImageComponent src={brand} />
          </div>

          <div className={css.details}>
            <div className={css.name}>Chaaye Khana</div>
            <div className={css.address}>
              <MdLocationOn />
              <span>Northern bypass bossan road near sardar chowk, Multan</span>
            </div>
            <div className={css.rating}>
              <FaStar color="#FFA534" />
              <p>
                4.1/4<span> (1000+)</span>
              </p>
              <button>See reviews</button>
              <button className={css.moreInfo}>
                <IoMdInformationCircleOutline /> More info
              </button>
            </div>
          </div>
        </div>

        <div className={css.right}>
          <button>Make a new Appointment</button>
        </div>
      </div>

      {/* Services  */}

      <div className={css.servicesWrapper}>
        <div className="w-[84%] flex items-center justify-between">
          <div className={css.title}>
            <h1>
              <FaFire /> Available Services
            </h1>
          </div>

          {/* <div className={css.title}>
            <h1>Opening Hours</h1>
          </div> */}
        </div>

        <div className={css.services}>
          <div className={css.left}>
            <Services />
          </div>
          <div className={`${css.right} -mt-12`}>
            <div
              className={`${css.title} mb-4 w-full flex items-center justify-between`}
            >
              <h1>Opening Hours</h1>
              <div className="px-6 py-0.5 bg-[#01AB8E] text-white flex items-center justify-center rounded-full">
                Hours
              </div>
            </div>
            <OpeningHours />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
