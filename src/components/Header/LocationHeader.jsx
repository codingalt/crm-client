import React from 'react'
import css from "./Header.module.scss";
import { HiOutlineLocationMarker } from "react-icons/hi";
import LocationIcon from './LocationIcon';
import { useSelector } from 'react-redux';
import { truncateText } from '../../utils/helpers/helpers';
import { useTranslation } from 'react-i18next';

const LocationHeader = ({ onOpen }) => {
  const { t } = useTranslation();
  const { location } = useSelector((store) => store.auth);
  return (
    <div className="flex pb-5 pt-2 h-12 items-center justify-center w-full bg-white -mt-0.5 z-[999] md:hidden">
      <div
        className={`px-2 py-3 flex items-center justify-center hover:bg-[#eef9f7] transition-all rounded-lg`}
        onClick={onOpen}
      >
        <div className="flex justify-center items-center">
          <button className="outline-none border-none bg-transparent flex items-center justify-center gap-0">
            <LocationIcon className="text-[#656565] text-[1rem]" />
            <p className="text-sm md:text-medium m-0 text-[#454545] font-medium text-ellipsis whitespace-nowrap pr-1">
              <span className="hidden xl:inline-block">{t("newAddress")}</span>
              <span className="text-[#01ABAB] inline-block ml-1">
                {truncateText(location.address, 35)}
              </span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationHeader