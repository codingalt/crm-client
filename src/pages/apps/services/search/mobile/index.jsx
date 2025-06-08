import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSearchServicesQuery } from "@/services/api/servicesApi/servicesApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Calendar1, Clock, Location, SearchNormal1 } from "iconsax-react";

const SearchServicesMobilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { location } = useSelector((store) => store.auth);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showEmptyData, setShowEmptyData] = useState(false);
  const { data, isFetching, error, isLoading } = useSearchServicesQuery(
    {
      query: debouncedSearchText,
      city: location?.city,
    },
    { skip: !location || debouncedSearchText.length === 0 }
  );

  useEffect(() => {
    if (data && !isFetching) {
      setResults(data.services);
      setShowEmptyData(false);
    }
  }, [data, isFetching]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText);
      setIsSearching(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  useEffect(() => {
    if (
      !isSearching &&
      !isFetching &&
      searchText.length > 0 &&
      !error &&
      results?.length === 0
    ) {
      const emptyDataTimeout = setTimeout(() => {
        setShowEmptyData(true);
      }, 100); // Delay before showing EmptyData component

      return () => clearTimeout(emptyDataTimeout);
    }
  }, [isSearching, isFetching, setSearchText, searchText, error, results]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setIsSearching(true);
    setShowEmptyData(false);
  };

  return (
    <div
      className={`z-[9999] fixed top-0 left-0 right-0 bottom-0 flex size-full min-h-screen flex-col bg-white justify-between group/design-root overflow-x-hidden`}
    >
      <div className="w-full h-full max-h-screen relative overflow-y-auto">
        <div className="fixed top-0 left-0 right-0 bg-white z-10 flex items-center p-4 py-2 justify-between">
          <div
            onClick={() => navigate("/dashboard")}
            className="text-gray-800 flex size-11 shrink-0 justify-center hover:bg-gray-50 rounded-lg items-center"
          >
            <ArrowLeft size={24} />
          </div>
          <h2 className="text-gray-800 text-lg font-semibold leading-tight tracking-tight flex-1 text-center pr-12">
            Search
          </h2>
        </div>

        <div className="w-full pt-[70px] overflow-y-auto max-h-[calc(100vh-90px)] h-full">
          <div className="flex flex-wrap items-end gap-4 px-4 py-2">
            <label className="flex flex-col min-w-40 flex-1">
              <div className="flex w-full flex-1 items-stretch rounded-xl">
                <input
                  placeholder="Service"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-900 focus:outline-0 focus:ring-0 border border-gray-300 bg-white focus:border-gray-300 h-14 placeholder:text-gray-500 p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                  defaultValue=""
                />
                <div className="text-gray-500 flex border border-gray-300 bg-white items-center justify-center pr-4 rounded-r-xl border-l-0">
                  <SearchNormal1 />
                </div>
              </div>
            </label>
          </div>

          <div className="flex flex-wrap items-end gap-4 px-4 py-2">
            <label className="flex flex-col min-w-40 flex-1">
              <div className="flex w-full flex-1 items-stretch rounded-xl">
                <input
                  placeholder="Location"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-900 focus:outline-0 focus:ring-0 border border-gray-300 bg-white focus:border-gray-300 h-14 placeholder:text-gray-500 p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                  defaultValue=""
                />
                <div className="text-gray-500 flex border border-gray-300 bg-white items-center justify-center pr-4 rounded-r-xl border-l-0">
                  <Location />
                </div>
              </div>
            </label>
          </div>

          <div className="flex w-full items-end gap-4 px-4 py-2">
            <label className="flex flex-col min-w-40 flex-1">
              <div className="flex w-full flex-1 items-stretch rounded-xl">
                <input
                  placeholder="Date"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-900 focus:outline-0 focus:ring-0 border border-gray-300 bg-white focus:border-gray-300 h-14 placeholder:text-gray-500 p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                  defaultValue=""
                />
                <div className="text-gray-500 flex border border-gray-300 bg-white items-center justify-center pr-4 rounded-r-xl border-l-0">
                  <Calendar1 />
                </div>
              </div>
            </label>
            <label className="flex flex-col min-w-40 flex-1">
              <div className="flex w-full flex-1 items-stretch rounded-xl">
                <input
                  placeholder="Time"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-900 focus:outline-0 focus:ring-0 border border-gray-300 bg-white focus:border-gray-300 h-14 placeholder:text-gray-500 p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                  defaultValue=""
                />
                <div className="text-gray-500 flex border border-gray-300 bg-white items-center justify-center pr-4 rounded-r-xl border-l-0">
                  <Clock />
                </div>
              </div>
            </label>
          </div>

          {/* Categories  */}
          <div className="pb-5">
            <h2 className="text-gray-900 text-lg font-semibold leading-tight tracking-tight px-4 pb-3 pt-5">
              Looking for
            </h2>

            <div className="flex items-center gap-4 hover:bg-gray-50 transition-all px-4 min-h-14">
              <div
                className="text-hintPrimary flex items-center justify-center rounded-lg bg-gray-100 shrink-0 size-10"
                data-icon="House"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
                </svg>
              </div>
              <p className="text-gray-900 text-base font-normal leading-normal flex-1 truncate">
                Cleaning
              </p>
            </div>

            <div className="flex items-center gap-4 hover:bg-gray-50 transition-all px-4 min-h-14">
              <div
                className="text-hintPrimary flex items-center justify-center rounded-lg bg-gray-100 shrink-0 size-10"
                data-icon="Drop"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75ZM128,216a72.08,72.08,0,0,1-72-72c0-57.23,55.47-105,72-118,16.53,13,72,60.75,72,118A72.08,72.08,0,0,1,128,216Zm55.89-62.66a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z"></path>
                </svg>
              </div>
              <p className="text-gray-900 text-base font-normal leading-normal flex-1 truncate">
                Plumbing
              </p>
            </div>

            <div className="flex items-center gap-4 hover:bg-gray-50 transition-all px-4 min-h-14">
              <div
                className="text-hintPrimary flex items-center justify-center rounded-lg bg-gray-100 shrink-0 size-10"
                data-icon="Scissors"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M157.73,113.13A8,8,0,0,1,159.82,102L227.48,55.7a8,8,0,0,1,9,13.21l-67.67,46.3a7.92,7.92,0,0,1-4.51,1.4A8,8,0,0,1,157.73,113.13Zm80.87,85.09a8,8,0,0,1-11.12,2.08L136,137.7,93.49,166.78a36,36,0,1,1-9-13.19L121.83,128,84.44,102.41a35.86,35.86,0,1,1,9-13.19l143,97.87A8,8,0,0,1,238.6,198.22ZM80,180a20,20,0,1,0-5.86,14.14A19.85,19.85,0,0,0,80,180ZM74.14,90.13a20,20,0,1,0-28.28,0A19.85,19.85,0,0,0,74.14,90.13Z"></path>
                </svg>
              </div>
              <p className="text-gray-900 text-base font-normal leading-normal flex-1 truncate">
                Electrical
              </p>
            </div>

            <div className="flex items-center gap-4 hover:bg-gray-50 transition-all px-4 min-h-14">
              <div
                className="text-hintPrimary flex items-center justify-center rounded-lg bg-gray-100 shrink-0 size-10"
                data-icon="Wrench"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M226.76,69a8,8,0,0,0-12.84-2.88l-40.3,37.19-17.23-3.7-3.7-17.23,37.19-40.3A8,8,0,0,0,187,29.24,72,72,0,0,0,88,96,72.34,72.34,0,0,0,94,124.94L33.79,177c-.15.12-.29.26-.43.39a32,32,0,0,0,45.26,45.26c.13-.13.27-.28.39-.42L131.06,162A72,72,0,0,0,232,96,71.56,71.56,0,0,0,226.76,69ZM160,152a56.14,56.14,0,0,1-27.07-7,8,8,0,0,0-9.92,1.77L67.11,211.51a16,16,0,0,1-22.62-22.62L109.18,133a8,8,0,0,0,1.77-9.93,56,56,0,0,1,58.36-82.31l-31.2,33.81a8,8,0,0,0-1.94,7.1L141.83,108a8,8,0,0,0,6.14,6.14l26.35,5.66a8,8,0,0,0,7.1-1.94l33.81-31.2A56.06,56.06,0,0,1,160,152Z"></path>
                </svg>
              </div>
              <p className="text-gray-900 text-base font-normal leading-normal flex-1 truncate">
                Handyman
              </p>
            </div>

            <div className="flex items-center gap-4 hover:bg-gray-50 transition-all px-4 min-h-14">
              <div
                className="text-hintPrimary flex items-center justify-center rounded-lg bg-gray-100 shrink-0 size-10"
                data-icon="PaintBrush"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,32a8,8,0,0,0-8-8c-44.08,0-89.31,49.71-114.43,82.63A60,60,0,0,0,32,164c0,30.88-19.54,44.73-20.47,45.37A8,8,0,0,0,16,224H92a60,60,0,0,0,57.37-77.57C182.3,121.31,232,76.08,232,32ZM92,208H34.63C41.38,198.41,48,183.92,48,164a44,44,0,1,1,44,44Zm32.42-94.45q5.14-6.66,10.09-12.55A76.23,76.23,0,0,1,155,121.49q-5.9,4.94-12.55,10.09A60.54,60.54,0,0,0,124.42,113.55Zm42.7-2.68a92.57,92.57,0,0,0-22-22c31.78-34.53,55.75-45,69.9-47.91C212.17,55.12,201.65,79.09,167.12,110.87Z"></path>
                </svg>
              </div>
              <p className="text-gray-900 text-base font-normal leading-normal flex-1 truncate">
                Painting
              </p>
            </div>

            <div className="flex items-center gap-4 hover:bg-gray-50 transition-all px-4 min-h-14">
              <div
                className="text-hintPrimary flex items-center justify-center rounded-lg bg-gray-100 shrink-0 size-10"
                data-icon="PaintBrush"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,32a8,8,0,0,0-8-8c-44.08,0-89.31,49.71-114.43,82.63A60,60,0,0,0,32,164c0,30.88-19.54,44.73-20.47,45.37A8,8,0,0,0,16,224H92a60,60,0,0,0,57.37-77.57C182.3,121.31,232,76.08,232,32ZM92,208H34.63C41.38,198.41,48,183.92,48,164a44,44,0,1,1,44,44Zm32.42-94.45q5.14-6.66,10.09-12.55A76.23,76.23,0,0,1,155,121.49q-5.9,4.94-12.55,10.09A60.54,60.54,0,0,0,124.42,113.55Zm42.7-2.68a92.57,92.57,0,0,0-22-22c31.78-34.53,55.75-45,69.9-47.91C212.17,55.12,201.65,79.09,167.12,110.87Z"></path>
                </svg>
              </div>
              <p className="text-gray-900 text-base font-normal leading-normal flex-1 truncate">
                Painting
              </p>
            </div>

            <div className="flex items-center gap-4 hover:bg-gray-50 transition-all px-4 min-h-14">
              <div
                className="text-hintPrimary flex items-center justify-center rounded-lg bg-gray-100 shrink-0 size-10"
                data-icon="PaintBrush"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,32a8,8,0,0,0-8-8c-44.08,0-89.31,49.71-114.43,82.63A60,60,0,0,0,32,164c0,30.88-19.54,44.73-20.47,45.37A8,8,0,0,0,16,224H92a60,60,0,0,0,57.37-77.57C182.3,121.31,232,76.08,232,32ZM92,208H34.63C41.38,198.41,48,183.92,48,164a44,44,0,1,1,44,44Zm32.42-94.45q5.14-6.66,10.09-12.55A76.23,76.23,0,0,1,155,121.49q-5.9,4.94-12.55,10.09A60.54,60.54,0,0,0,124.42,113.55Zm42.7-2.68a92.57,92.57,0,0,0-22-22c31.78-34.53,55.75-45,69.9-47.91C212.17,55.12,201.65,79.09,167.12,110.87Z"></path>
                </svg>
              </div>
              <p className="text-gray-900 text-base font-normal leading-normal flex-1 truncate">
                Painting
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-1.5 z-10 fixed left-0 right-0 bottom-0">
        <div className="flex px-4 py-3">
          <Button className="flex min-w-21 max-w-lg cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 text-base font-bold leading-normal tracking-wide">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchServicesMobilePage;
