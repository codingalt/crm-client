import React, { useRef, useState } from "react";
import css from "./SearchServices.module.scss";
import { CiSearch } from "react-icons/ci";
import { useMainContext } from "../../context/MainContext";
import useClickOutside from "../../hooks/useClickOutside";
import SearchSuggestion from "./SearchSuggestion";
import { useSearchServicesQuery } from "../../services/api/servicesApi/servicesApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SearchServices = () => {
  const { t } = useTranslation();
  const { showSearch, setShowSearch } = useMainContext();
  const searchRef = useRef();
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

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setIsSearching(true);
    setShowEmptyData(false);
  };

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
  }, [isSearching, isFetching, searchText, error, results]);

  useClickOutside(searchRef, () => setShowSearch(false));

  return (
    <div
      className={`${
        css.searchWrapper
      } w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 transition-opacity duration-400 ${
        showSearch ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`w-full max-w-full md:max-w-screen-sm lg:max-w-2xl bg-white md:pt-0 rounded-none md:rounded-b-none md:rounded-xl ${
          showSearch
            ? "w-full absolute left-0 right-0 mx-auto lg:left-32 lg:mx-0 lg:right-auto top-0 md:top-5"
            : ""
        }`}
        style={{ zIndex: 9999 }}
        ref={searchRef}
      >
        <div className="w-full border shadow-sm rounded-xl h-16 flex items-center px-4">
          <CiSearch className="text-2xl text-[#919090]" />
          <input
            type="text"
            value={searchText}
            maxLength={70}
            onChange={handleSearchChange}
            placeholder={t("whatAreYouLookingFor")}
            className="w-full h-full pl-3 outline-none border-none bg-transparent placeholder:font-normal placeholder:text-medium placeholder:text-[#ababab]"
          />
        </div>

        {/* Search Suggestions  */}
        <SearchSuggestion
          showSearch={showSearch}
          isSearching={isSearching}
          searchText={searchText}
          isFetching={isFetching}
          results={results}
          error={error}
          setSearchText={setSearchText}
          debouncedSearchText={debouncedSearchText}
          setDebouncedSearchText={setDebouncedSearchText}
          showEmptyData={showEmptyData}
          setShowEmptyData={setShowEmptyData}
        />
      </div>
    </div>
  );
};

export default SearchServices;
