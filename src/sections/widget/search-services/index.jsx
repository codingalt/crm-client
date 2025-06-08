import React, { useRef, useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import css from "./SearchServices.module.scss";
import { useMainContext } from "@/context/MainContext";
import SearchSuggestion from "./SearchSuggestion";
import { useSearchServicesQuery } from "@/services/api/servicesApi/servicesApi";
import { useTranslation } from "react-i18next";
import SearchForm from "./SearchForm";
import dayjs from "dayjs";
import { format } from "date-fns";

const serializeFilters = (filters) => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.date)
    params.append("date", dayjs(filters.date).format("YYYY-MM-DD"));
  if (filters.time) params.append("time", filters.time);
  if (filters.location?.country)
    params.append("country_id", filters.location?.country);
  if (filters.location?.city) params.append("city_id", filters.location?.city);
  if (filters.location?.latitude)
    params.append("latitude", filters.location?.latitude);
  if (filters.location?.longitude)
    params.append("longitude", filters.location?.longitude);

  return params.toString();
};

const SearchServices = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showSearch, setShowSearch } = useMainContext();
  const searchRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [date, setDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(null);
  // Location state
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    country: null,
    city: null,
  });
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showEmptyData, setShowEmptyData] = useState(false);
  const { data, isFetching, error } = useSearchServicesQuery(
    serializeFilters({
      search: debouncedSearchText,
      date: date,
      time: selectedTime,
      location: locationData,
    }),
    { skip: debouncedSearchText.length === 0 }
  );

  useEffect(() => {
    if (data && !isFetching) {
      setResults(data.results);
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
      results?.services?.length === 0 &&
      results?.businesses?.length === 0 &&
      results?.categories?.length === 0 &&
      results?.subcategories?.length === 0
    ) {
      const emptyDataTimeout = setTimeout(() => {
        setShowEmptyData(true);
      }, 100); // Delay before showing EmptyData component

      return () => clearTimeout(emptyDataTimeout);
    }
  }, [isSearching, isFetching, searchText, error, results]);  

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSearch(false);
    }
  };

  const handleSearch = () => {
    const searchParams = {
      search: debouncedSearchText ? debouncedSearchText : undefined,
      date: date ? format(date, "yyyy-MM-dd") : undefined,
      time: selectedTime ? selectedTime : undefined,
    };

    // Add location params
    if (locationData.latitude && locationData.longitude) {
      searchParams.latitude = locationData.latitude;
      searchParams.longitude = locationData.longitude;
    } else {
      if (locationData.country) {
        searchParams.country_id = locationData.country;
      }
      if (locationData.city) {
        searchParams.city_id = locationData.city;
      }
    }

    // Remove undefined values
    const cleanParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== undefined)
    );

    setShowSearch(false);

    // Navigate with search params
    navigate({
      pathname: "/services",
      search: createSearchParams(cleanParams).toString(),
    });
  };

  return (
    <div
      className={`${
        css.searchWrapper
      } w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-60 transition-opacity duration-400 ${
        showSearch ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={handleModalClick}
    >
      <div
        className={`w-full max-w-full md:max-w-full lg:max-w-screen-lg bg-white md:pt-0 rounded-none lg:rounded-b-none lg:rounded-2xl ${
          showSearch
            ? "w-full absolute left-1/2 -translate-x-1/2 right-0 mx-auto lg:mx-0 top-0 lg:top-4"
            : ""
        }`}
        style={{ zIndex: 9999 }}
        ref={searchRef}
      >
        {/* Search Form  */}
        <SearchForm
          {...{
            searchText,
            setSearchText,
            handleSearchChange,
            date,
            setDate,
            selectedTime,
            setSelectedTime,
            locationData,
            setLocationData,
            handleSearch,
          }}
        />

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
