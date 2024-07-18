import { Rating } from "@mui/material";
import { Avatar, AvatarGroup, Button, Skeleton } from "@nextui-org/react";
import React from "react";
import { FaCamera } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyData from "./EmptyData";

const SearchSuggestion = ({
  showSearch,
  isSearching,
  searchText,
  isFetching,
  results,
  error,
  setSearchText,
  debouncedSearchText,
}) => {
  return (
    <div
      className={`bg-white overflow-hidden absolute left-0 right-0 top-full rounded-none md:rounded-xl md:rounded-t-none transition-opacity duration-200 ${
        showSearch ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="w-full h-dvh md:h-auto md:max-h-[60vh] px-5 pt-4 md:pt-2 pb-8 border rounded-none md:rounded-xl md:rounded-t-none">
        <p className="text-default-400 md:text-default-300 font-normal text-xs md:text-sm ">
          Search by service name, business, tags, category, and e.t.
        </p>

        {!error && !isFetching && searchText.length === 0 && (
          <div className="w-full">
            {/* Show Tags  */}
            <div className="w-full mt-7 md:mt-5">
              <p className="text-sm font-medium text-default-400">
                Looking for...
              </p>
              <div className="flex items-center gap-x-3 gap-y-3 py-3 overflow-x-auto scrollbar-hide">
                {/* Skeleton  */}
                {/* <Skeleton
              disableAnimation
              className="w-16 h-6 rounded-full bg-default-900"
            />
            <Skeleton
              disableAnimation
              className="w-24 h-6 rounded-full bg-default-900"
            />
            <Skeleton
              disableAnimation
              className="w-28 h-6 rounded-full bg-default-900"
            />
            <Skeleton
              disableAnimation
              className="w-24 h-6 rounded-full bg-default-900"
            />
            <Skeleton
              disableAnimation
              className="w-28 h-6 rounded-full bg-default-900"
            />
            <Skeleton
              disableAnimation
              className="w-16 h-6 rounded-full bg-default-900"
            />
            <Skeleton
              disableAnimation
              className="w-24 h-6 rounded-full bg-default-900"
            /> */}
                <div className="flex items-center justify-center cursor-pointer px-3.5 py-1 text-sm font-medium text-gray-600 rounded-full bg-[#E9F5F9]">
                  All
                </div>
                <div className="flex items-center justify-center cursor-pointer px-3.5 py-1 text-sm font-medium text-gray-600 rounded-full bg-[#E9F5F9]">
                  Patient
                </div>
                <div className="flex items-center justify-center cursor-pointer px-3.5 py-1 text-sm font-medium text-gray-600 rounded-full bg-[#E9F5F9]">
                  Medication
                </div>
                <div className="flex items-center justify-center cursor-pointer px-3.5 py-1 text-sm font-medium text-gray-600 rounded-full bg-[#E9F5F9]">
                  Supplement
                </div>
                <div className="flex items-center justify-center cursor-pointer px-3.5 py-1 text-sm font-medium text-gray-600 rounded-full bg-[#E9F5F9]">
                  Service
                </div>
                <div className="flex items-center justify-center cursor-pointer px-3.5 py-1 text-sm font-medium text-gray-600 rounded-full bg-[#E9F5F9]">
                  Resource
                </div>
                <div className="flex items-center justify-center cursor-pointer px-3.5 py-1 text-sm font-medium text-gray-600 rounded-full bg-[#E9F5F9]">
                  Appointment
                </div>
              </div>
            </div>

            {/* Show Popular Services  */}
            <div className="w-full mt-6 md:mt-4">
              <p className="text-sm font-medium text-default-400">
                Popular Services
              </p>
              <div className="w-full mt-4">
                {results?.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between w-full cursor-pointer md:hover:bg-slate-100 transition-all rounded-lg md:px-2 py-2 mb-2"
                    onClick={() =>
                      navigate(`/services/${item.name}/${item.id}`)
                    }
                  >
                    {/* Left Side  */}
                    <div className="flex">
                      <div className="w-10 h-10 rounded-lg">
                        <Avatar
                          radius="sm"
                          size="md"
                          src={`https://i.pravatar.cc/150?u=${item.id}`}
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
        {!error && (
          <div className="w-full mt-6 md:mt-4">
            <p className="text-sm font-medium text-default-400">Services</p>
            <div className="w-full mt-4">
              {results?.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between w-full cursor-pointer md:hover:bg-slate-100 transition-all rounded-lg md:px-2 py-2 mb-2"
                  onClick={() => navigate(`/services/${item.name}/${item.id}`)}
                >
                  {/* Left Side  */}
                  <div className="flex">
                    <div className="w-10 h-10 rounded-lg">
                      <Avatar
                        radius="sm"
                        size="md"
                        src={`https://i.pravatar.cc/150?u=${item.id}`}
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
        )}

        {/* Show Error If get error from api when loading data  */}
        {!isFetching && error && (
          <EmptyData
            debouncedSearchText={debouncedSearchText}
            setSearchText={setSearchText}
          />
        )}

        {/* Loading State  */}
        {isFetching && <LoadingSkeleton />}

        {/* Empty Data Message  */}
        {!isSearching &&
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
