import { Rating } from "@mui/material";
import { Avatar } from "@nextui-org/react";
import React, { useMemo } from "react";
import { FaCamera, FaBuilding, FaTags, FaList, FaSearch } from "react-icons/fa";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyData from "./EmptyData";
import { useNavigate } from "react-router-dom";
import { useMainContext } from "@/context/MainContext";
import SearchTags from "./SearchTags";
import { useTranslation } from "react-i18next";
import { truncateText } from "@/utils/helpers/helpers";
import slugify from "slugify";

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
  showEmptyData,
  setShowEmptyData,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setShowSearch } = useMainContext();

  // Memoize results
  const searchResults = useMemo(() => {
    if (!results)
      return {
        services: [],
        businesses: [],
      };

    return {
      services: results.services || [],
      businesses: results.businesses || []
    };
  }, [results]);

  // Check if we have any search results
  const hasResults = useMemo(() => {
    return Object.values(searchResults).some((arr) => arr.length > 0);
  }, [searchResults]);

  const handleExactSearch = (searchTerm) => {
    setShowSearch(false);
    navigate(`/services?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleServiceNavigate = (item) => {
    setShowSearch(false);
    navigate(`/service/${slugify(item.name,{lower: true})}/${item.id}`);
  };

  const handleBusinessNavigate = (business) => {
    setShowSearch(false);
    navigate(
      `/business/${slugify(business.name, { lower: true })}/${business.id}`
    );
  };

  // Render exact search option
  const renderExactSearchOption = (searchTerm) => {
    if (!searchTerm || searchTerm.trim().length === 0) return null;

    return (
      <div className="w-full mb-3">
        <div
          className="flex items-center w-full cursor-pointer md:hover:bg-blue-50 transition-all rounded-lg md:px-2 py-3 border-b border-gray-100"
          onClick={() => handleExactSearch(searchTerm)}
        >
          <div className="w-10 h-10 rounded-lg flex-shrink-0 bg-blue-100 flex items-center justify-center">
            <FaSearch className="text-lg text-blue-600" />
          </div>
          <div className="ml-3 min-w-0 flex-1">
            <p className="text-sm font-medium text-blue-600">
              Search for "{truncateText(searchTerm.trim(), 25)}"
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              View all results for this search term
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render result item based on type
  const renderResultItem = (item, type, onClick) => {
    const icons = {
      service: <FaCamera className="animate-pulse text-lg text-default-500" />,
      business: <FaBuilding className="text-lg text-blue-500" />,
    };

    const getSubtitle = () => {
      switch (type) {
        case "service":
          return (
            <div className="flex items-center gap-1 text-gray-400">
              <span className="text-tiny font-medium">
                {item.business?.name}
              </span>
              <span className="text-gray-300">|</span>
              <Rating
                size="small"
                name="read-only"
                value={parseFloat(item.avg_rating) || 4}
                readOnly
                sx={{ fontSize: ".99rem" }}
              />
            </div>
          );
        case "business":
          return (
            <span className="text-tiny font-medium text-gray-400">
              {item.city?.name}
            </span>
          );
        default:
          return null;
      }
    };

    return (
      <div
        key={`${type}-${item.id}`}
        className="flex items-center justify-between w-full cursor-pointer md:hover:bg-slate-100 transition-all rounded-lg md:px-2 py-2 mb-1.5"
        onClick={() => onClick(item)}
      >
        {/* Left Side */}
        <div className="flex items-center flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg flex-shrink-0">
            <Avatar
              radius="sm"
              size="md"
              src={
                type === "service"
                  ? import.meta.env.VITE_SERVICE_IMAGE + item.image
                  : type === "business"
                  ? import.meta.env.VITE_BUSINESS_IMAGE + item.profile_picture
                  : null
              }
              fallback={icons[type]}
            />
          </div>
          <div className="ml-3 min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-800 truncate">
              {truncateText(item.name, 22)}
            </p>
            {getSubtitle()}
          </div>
        </div>

        {/* Right Side - Only show price for services */}
        {type === "service" && (
          <div className="text-gray-600 font-medium text-sm md:text-medium md:pr-3 flex-shrink-0">
            <p>{item.price} Nis</p>
          </div>
        )}
      </div>
    );
  };

  // Render section with title and items
  const renderSection = (title, items, type, onClickHandler, maxItems = 3) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="w-full mt-5 first:mt-0">
        <p className="text-sm font-normal md:font-medium text-default-600 mb-2">
          {title}
        </p>
        <div className="w-full">
          {items
            .slice(0, maxItems)
            .map((item) => renderResultItem(item, type, onClickHandler))}
          {items.length > maxItems && (
            <p className="text-xs text-gray-400 mt-1 px-2">
              +{items.length - maxItems} more {title.toLowerCase()}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`bg-white min-h-52 ${
        !isMobile ? "absolute left-0 right-0 top-full" : ""
      } rounded-none md:rounded-xl md:rounded-t-none transition-opacity duration-150 ${
        showSearch || isMobile ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="w-full min-h-32 h-[calc(100vh-128px)] md:h-auto md:max-h-[65vh] px-5 pl-3.5 pt-1 md:pt-0 pb-6 rounded-none md:rounded-xl md:rounded-t-none overflow-y-auto">
        {/* Initial state - no search text */}
        {!error && !isFetching && searchText.length === 0 && (
          <div className="w-full px-1.5">
            {/* Search Tags */}
            <SearchTags
              setSearchText={setSearchText}
              setDebouncedSearchText={setDebouncedSearchText}
            />

            {/* Popular Services */}
            {renderSection(
              "Popular Services",
              searchResults.services,
              "service",
              handleServiceNavigate,
              3
            )}
          </div>
        )}

        {/* Search Results */}
        {searchText.length > 0 && !error && !isFetching && (
          <div className="w-full mt-2">
            {/* Only show sections if we have results */}
            {hasResults && (
              <>
                {/* Exact Search Option  */}
                {renderExactSearchOption(searchText)}

                {/* Services */}
                {renderSection(
                  "Services",
                  searchResults.services,
                  "service",
                  handleServiceNavigate,
                  3
                )}

                {/* Businesses */}
                {renderSection(
                  "Businesses",
                  searchResults.businesses,
                  "business",
                  handleBusinessNavigate,
                  3
                )}
              </>
            )}
          </div>
        )}

        {/* Error State */}
        {!isFetching && error && !isSearching && (
          <EmptyData
            debouncedSearchText={debouncedSearchText}
            setSearchText={setSearchText}
            setShowEmptyData={setShowEmptyData}
          />
        )}

        {/* Loading State */}
        {searchText?.length > 0 && (isFetching || isSearching) && (
          <LoadingSkeleton />
        )}

        {/* Show Empty Data Message */}
        {showEmptyData && (
          <EmptyData
            debouncedSearchText={debouncedSearchText}
            setSearchText={setSearchText}
            setShowEmptyData={setShowEmptyData}
          />
        )}
      </div>
    </div>
  );
};

export default SearchSuggestion;
