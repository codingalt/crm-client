import React from 'react'
import css from "./Header.module.scss";
import { HiOutlineLocationMarker } from "react-icons/hi";
import LocationIcon from './LocationIcon';

const LocationHeader = ({ onOpen }) => {
  return (
    <div className="flex pb-5 pt-2 h-12 items-center justify-center w-full bg-white z-[999] md:hidden">
      <div
        className={`px-2 py-3 flex items-center justify-center hover:bg-[#eef9f7] transition-all rounded-lg`}
        onClick={onOpen}
      >
        <div className="flex justify-center items-center">
          <button className="outline-none border-none bg-transparent flex items-center justify-center gap-1">
            <LocationIcon className="text-[#454545] text-[1.15rem]" />
            <p className="text-sm md:text-medium m-0 text-[#454545] font-medium text-ellipsis whitespace-nowrap pr-1">
              <span className="hidden xl:inline-block">New address</span>
              <span className="text-[#01ABAB] inline-block ml-1">
                Multan International Airport Multan
              </span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationHeader