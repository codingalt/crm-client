import React from "react";
import { useTranslation } from "react-i18next";

const tags = [
  "Gym",
  "Massage",
  "Yoga",
  "Hair Cut",
  "Personal Training",
  "Nutrition Counseling",
  "Physiotherapy",
  "Pilates",
  "Dance Classes",
  "Martial Arts",
  "Aromatherapy",
  "Facial Treatments",
  "Manicure",
  "Pedicure",
];

const SearchTags = ({ setSearchText, setDebouncedSearchText }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full mt-7 md:mt-5">
      <p className="text-sm font-medium text-default-400">{t("lookingFor")}</p>
      <div className="flex items-center flex-wrap gap-x-3 gap-y-4 py-3 overflow-x-auto scrollbar-hide">
        {tags?.map((item, index) => (
          <div
            key={index}
            className="flex items-center text-ellipsis text-nowrap justify-center cursor-pointer px-3.5 py-1 text-sm font-medium text-gray-600 rounded-full bg-[#E9F5F9]"
            onClick={() => {
              setDebouncedSearchText(item);
              setSearchText(item);
            }}
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchTags;
