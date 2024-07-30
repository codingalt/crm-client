import { Rating } from "@mui/material";
import { Avatar, AvatarGroup, Button, Skeleton } from "@nextui-org/react";
import React from "react";
import { FaCamera } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyData from "./EmptyData";
import { useNavigate } from "react-router-dom";
import { useMainContext } from "../../context/MainContext";
import SearchTags from "./SearchTags";
import { useTranslation } from "react-i18next";
import { truncateText } from "../../utils/helpers/helpers";

const SearchSuggestion = ({
  showSearch,
  isSearching,
  searchText,
  isFetching,
  results,
  error,
  setSearchText,
  debouncedSearchText,
  setDebouncedSearchText,
  isMobile,
  isInitialized,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setShowSearch } = useMainContext();

  const handleNavigate = (item) => {
    setShowSearch(false);
    navigate(`/services/${item.name}/${item.id}`);
  };

  return (
    <div
      className={`bg-white min-h-72 overflow-hidden ${
        !isMobile ? "absolute left-0 right-0 top-full" : "mt-16 overflow-y-auto"
      } rounded-none md:rounded-xl md:rounded-t-none transition-opacity duration-150 ${
        showSearch || isMobile ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="w-full min-h-32 h-dvh md:h-auto md:max-h-[60vh] px-5 pt-3 md:pt-2 pb-8 rounded-none md:rounded-xl md:rounded-t-none">
        <p className="text-default-400 md:text-default-300 font-normal text-xs md:text-sm ">
          {t("searchByText")}
        </p>

        {!error && !isFetching && searchText.length === 0 && (
          <div className="w-full">
            {/* Show Tags  */}
            <SearchTags
              setSearchText={setSearchText}
              setDebouncedSearchText={setDebouncedSearchText}
            />

            {/* Show Popular Services  */}
            <div className="w-full mt-6 md:mt-4 hidden">
              <p className="text-sm font-medium text-default-400">
                Popular Services
              </p>
              <div className="w-full mt-4">
                {results?.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between w-full cursor-pointer md:hover:bg-slate-100 transition-all rounded-lg md:px-2 py-2 mb-2"
                    onClick={() => handleNavigate(item)}
                  >
                    {/* Left Side  */}
                    <div className="flex">
                      <div className="w-10 h-10 rounded-lg">
                        <Avatar
                          radius="sm"
                          size="md"
                          src={import.meta.env.VITE_SERVICE_IMAGE + item.image}
                          fallback={
                            <FaCamera className="animate-pulse text-lg text-default-500" />
                          }
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-1 text-gray-400">
                          <span className="text-xs font-medium">
                            {item.business.name}
                          </span>
                          <span className="text-gray-300">|</span>
                          <Rating
                            size="small"
                            name="read-only"
                            value={4}
                            readOnly
                            sx={{ fontSize: ".99rem" }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Right Side  */}
                    <div className="text-gray-600 font-medium text-sm md:text-medium md:pr-3">
                      <p>{item.price} Nis</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Show Results from Backend  */}
        {searchText.length > 0 && !error && !isFetching && (
          <div className="w-full mt-6 md:mt-4">
            <div className="w-full mt-4">
              {results?.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between w-full cursor-pointer md:hover:bg-slate-100 transition-all rounded-lg md:px-2 py-2 mb-2"
                  onClick={() => handleNavigate(item)}
                >
                  {/* Left Side  */}
                  <div className="flex">
                    <div className="w-10 h-10 rounded-lg">
                      <Avatar
                        radius="sm"
                        size="md"
                        src={import.meta.env.VITE_SERVICE_IMAGE + item.image}
                        fallback={
                          <FaCamera className="animate-pulse text-lg text-default-500" />
                        }
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">
                        {truncateText(item.name, 22)}
                      </p>
                      <div className="flex items-center gap-1 text-gray-400">
                        <span className="text-tiny font-medium">
                          {item.business.name}
                        </span>
                        <span className="text-gray-300">|</span>
                        <Rating
                          size="small"
                          name="read-only"
                          value={4}
                          readOnly
                          sx={{ fontSize: ".99rem" }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Right Side  */}
                  <div className="text-gray-600 hidden md:block font-medium text-sm md:text-medium md:pr-3">
                    <p>{item.price} Nis</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show Error If get error from api when loading data  */}
        {!isFetching && error && !isSearching && (
          <EmptyData
            debouncedSearchText={debouncedSearchText}
            setSearchText={setSearchText}
          />
        )}

        {/* Loading State  */}
        {searchText.length > 0 &&
          (results.length > 0 ? isFetching : isFetching || isSearching) && (
            <LoadingSkeleton />
          )}

        {/* Empty Data Message  */}
        {isInitialized &&
          !isSearching &&
          !error &&
          searchText.length > 0 &&
          !isFetching &&
          results?.length === 0 && (
            <EmptyData
              debouncedSearchText={debouncedSearchText}
              setSearchText={setSearchText}
            />
          )}
      </div>
    </div>
  );
};

export default SearchSuggestion;
