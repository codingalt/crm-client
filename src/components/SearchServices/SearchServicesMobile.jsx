import React, { useState } from "react";
import css from "./SearchServices.module.scss";
import { CiSearch } from "react-icons/ci";
import SearchSuggestion from "./SearchSuggestion";
import { useSearchServicesQuery } from "../../services/api/servicesApi/servicesApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SearchServicesMobile = () => {
  const { t } = useTranslation();
  const { location } = useSelector((store) => store.auth);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { data, isFetching, error, isLoading } = useSearchServicesQuery(
    {
      query: debouncedSearchText,
      city: location?.city,
    },
    { skip: !location || debouncedSearchText.length === 0 }
  );

  useEffect(() => {
    if (data) {
      setResults(data.services);
      setIsInitialized(true);
    }
  }, [data, isLoading]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText);
      setIsSearching(false);
      setIsInitialized(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setIsSearching(true);
  };

  return (
    <div className={`${css.searchWrapper} w-full h-screen`}>
      <div
        className={`w-full bg-white rounded-none overflow-hidden`}
        style={{ zIndex: 9999 }}
      >
        <div className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm border h-16 flex items-center px-4">
          <CiSearch className="text-2xl text-[#919090]" />
          <input
            type="text"
            value={searchText}
            maxLength={70}
            onChange={handleSearchChange}
            placeholder={t("whatAreYouLookingFor")}
            className="w-full h-full pl-3 outline-none border-none bg-transparent placeholder:font-normal placeholder:text-sm placeholder:text-[#ababab]"
          />
        </div>

        {/* Search Suggestions  */}
        <SearchSuggestion
          showSearch={true}
          isSearching={isSearching}
          searchText={searchText}
          isFetching={isFetching}
          results={results}
          error={error}
          setSearchText={setSearchText}
          debouncedSearchText={debouncedSearchText}
          setDebouncedSearchText={setDebouncedSearchText}
          isMobile={true}
          isInitialized={isInitialized}
        />
      </div>
    </div>
  );
};

export default SearchServicesMobile;
