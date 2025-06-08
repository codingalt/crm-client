import React, { useEffect, useCallback, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ArrangeVertical,
  Location,
  Calendar1,
  DollarCircle,
  Star1,
  Tag,
} from "iconsax-react";
import { Button } from "@/components/ui/button";
import { initialFilterState, sortOptions } from "./data";
import SortContent from "./content/sort";
import PriceRangeContent from "./content/price-range";
import RatingContent from "./content/rating";
import CategoryContent from "./content/category";
import DateTimeContent from "./content/date-time";
import MobileFiltersModal from "./mobile/filter-modal";
import FilterButton from "./common/filter-button";
import ActiveFiltersDisplay from "./common/filter-display";
import LocationContent from "./content/location";
import { useGetGlobalCategoriesQuery } from "@/services/api/categoriesApi/categoriesApi";

// Parse URL parameters to filter state
const parseFiltersFromURL = (searchParams) => {
  const filters = { ...initialFilterState };

  // Handle search
  if (searchParams.get("search")) {
    filters.search = searchParams.get("search");
  }

  // Handle sort
  if (searchParams.get("sort_by")) {
    filters.sort = searchParams.get("sort_by");
  }

  // Handle price range
  const priceMin = searchParams.get("price_min");
  const priceMax = searchParams.get("price_max");
  if (priceMin || priceMax) {
    filters.priceRange = [
      priceMin ? parseInt(priceMin) : 0,
      priceMax ? parseInt(priceMax) : 500,
    ];
    filters.priceMin = priceMin || "";
    filters.priceMax = priceMax || "";
  }

  // Handle rating
  if (searchParams.get("rating")) {
    filters.selectedRating = parseInt(searchParams.get("rating"));
  }

  // Handle location
  if (searchParams.get("latitude")) {
    filters.latitude = parseFloat(searchParams.get("latitude"));
  }
  if (searchParams.get("longitude")) {
    filters.longitude = parseFloat(searchParams.get("longitude"));
  }

  if (searchParams.get("country_id")) {
    filters.country_id = parseInt(searchParams.get("country_id"));
  }
  if (searchParams.get("city_id")) {
    filters.city_id = parseInt(searchParams.get("city_id"));
  }

  if (searchParams.get("category_id")) {
    filters.selectedCategory = parseInt(searchParams.get("category_id"));
  }

  // Handle date
  if (searchParams.get("date")) {
    filters.selectedDate = searchParams.get("date");
  }

  // Handle time slot
  if (searchParams.get("time")) {
    filters.timeSlot = searchParams.get("time");
  }

  return filters;
};

// Convert filters to URL parameters
const filtersToURLParams = (filters) => {
  const params = new URLSearchParams();

  // Add search
  if (filters.search && filters.search.trim()) {
    params.set("search", filters.search.trim());
  }

  // Add sort (only if not default)
  if (filters.sort && filters.sort !== "popular") {
    params.set("sort_by", filters.sort);
  }

  // Add price range (only if not default)
  if (filters.priceRange && filters.priceRange[0] !== 0) {
    params.set("price_min", filters.priceRange[0].toString());
  }
  if (filters.priceRange && filters.priceRange[1] !== 500) {
    params.set("price_max", filters.priceRange[1].toString());
  }

  // Add rating
  if (filters.selectedRating) {
    params.set("rating", filters.selectedRating.toString());
  }

  // Add location
  if (filters.latitude) {
    params.set("latitude", filters.latitude.toString());
  }
  if (filters.longitude) {
    params.set("longitude", filters.longitude.toString());
  }

  if (filters.country_id) {
    params.set("country_id", filters.country_id.toString());
  }
  if (filters.city_id) {
    params.set("city_id", filters.city_id.toString());
  }

  // Add category
  if (filters.selectedCategory) {
    params.set("category_id", filters.selectedCategory);
  }

  // Add date
  if (filters.selectedDate) {
    params.set("date", filters.selectedDate);
  }

  // Add time slot
  if (filters.timeSlot) {
    params.set("time", filters.timeSlot);
  }

  return params;
};

// Custom hook for URL-synchronized filters
export const useURLFilters = (initialFilters = initialFilterState) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse initial filters from URL
  const [filters, setFiltersState] = useState(() => {
    const urlFilters = parseFiltersFromURL(searchParams);
    return { ...initialFilters, ...urlFilters };
  });

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters) => {
      const params = filtersToURLParams(newFilters);

      setSearchParams(params, { replace: true });
    },
    [setSearchParams]
  );

  // Set filters and update URL
  const setFilters = useCallback(
    (updater) => {
      setFiltersState((prev) => {
        const newFilters =
          typeof updater === "function" ? updater(prev) : updater;

        // Update URL after state is set
        setTimeout(() => updateURL(newFilters), 0);

        return newFilters;
      });
    },
    [updateURL]
  );

  // Update filters function
  const updateFilters = useCallback(
    (updates) => {
      setFilters((prev) => ({ ...prev, ...updates }));
    },
    [setFilters]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [setFilters, initialFilters]);

  // Listen for URL changes (browser back/forward)
  useEffect(() => {
    const urlFilters = parseFiltersFromURL(searchParams);
    setFiltersState({ ...initialFilters, ...urlFilters });
  }, [searchParams, initialFilters]);

  return {
    filters,
    setFilters,
    updateFilters,
    clearAllFilters,
  };
};

export default function FilterRow({ DATA_LENGTH }) {
  const { filters, updateFilters, clearAllFilters } = useURLFilters();

  // Categories Data
  const { data: categoryData, isLoading: loadingCategories } =
    useGetGlobalCategoriesQuery();

  // Calculate active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.sort !== "popular") count++;
    if (filters.selectedCategory) count++;
    if (
      filters.priceRange &&
      (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 500)
    )
      count++;
    if (filters.selectedDate || filters.timeSlot) count++;
    if (filters.selectedRating) count++;
    if (filters.city_id || filters.country_id) count++;
    if (filters.latitude) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  const hasSearch = filters.search && filters.search.trim();

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        {hasSearch ? (
          <p className="text-3xl font-light md:font-normal">
            Results for{" "}
            <span className="text-2xl font-semibold md:font-bold">
              "{filters.search.trim()}"
            </span>
          </p>
        ) : (
          <p className="text-3xl font-light md:font-normal">
            <span className="text-3xl capitalize font-medium">
              Available Services
            </span>{" "}
          </p>
        )}
      </div>

      {/* Desktop/Tablet Filter Bar */}
      <div className="hidden sm:flex items-center gap-3 scrollbar-hide overflow-x-auto">
        <div className="min-w-32 flex items-center gap-1 mr-1">
          <h3 className="text-sm whitespace-nowrap font-medium text-gray-900">
            Results
          </h3>
          <span className="text-xs whitespace-nowrap text-gray-500">
            ({DATA_LENGTH} found)
          </span>
        </div>

        <FilterButton
          icon={ArrangeVertical}
          label={
            sortOptions?.find((item) => item.value == filters?.sort)?.label ||
            "Most Popular"
          }
          hasActiveFilters={filters.sort !== "popular"}
        >
          {(closePopover) => (
            <SortContent
              filters={filters}
              updateFilters={updateFilters}
              onClose={closePopover}
            />
          )}
        </FilterButton>

        <FilterButton
          icon={Tag}
          label="Category"
          hasActiveFilters={filters?.selectedCategory}
        >
          {(closePopover) => (
            <div className="py-2">
              <CategoryContent
                data={categoryData}
                isLoading={loadingCategories}
                filters={filters}
                updateFilters={updateFilters}
                onClose={closePopover}
              />
            </div>
          )}
        </FilterButton>

        <FilterButton
          icon={Calendar1}
          label="Date & Time"
          hasActiveFilters={
            filters.selectedDate !== undefined || filters.timeSlot !== undefined
          }
        >
          {(closePopover) => (
            <div className="py-2">
              <DateTimeContent
                filters={filters}
                updateFilters={updateFilters}
                onClose={closePopover}
              />
            </div>
          )}
        </FilterButton>

        <FilterButton
          icon={Location}
          label="Location"
          hasActiveFilters={
            filters.country_id ||
            filters.city_id ||
            filters.latitude ||
            filters.longitude
          }
        >
          {(closePopover) => (
            <div className="py-2">
              <LocationContent
                filters={filters}
                updateFilters={updateFilters}
                onClose={closePopover}
              />
            </div>
          )}
        </FilterButton>

        <FilterButton
          icon={DollarCircle}
          label="Price Range"
          hasActiveFilters={
            filters.priceRange &&
            (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 500)
          }
        >
          {(closePopover) => (
            <div className="space-y-6 py-1.5">
              <div className="flex items-center gap-2">
                <DollarCircle className="w-5 h-5 text-hintPrimary" />
                <h4 className="font-semibold text-gray-900">Price Range</h4>
              </div>
              <PriceRangeContent
                filters={filters}
                updateFilters={updateFilters}
                onClose={closePopover}
              />
            </div>
          )}
        </FilterButton>

        <FilterButton
          icon={Star1}
          label="Rating"
          hasActiveFilters={
            filters.selectedRating !== null &&
            filters.selectedRating !== undefined
          }
        >
          {(closePopover) => (
            <div className="py-0.5">
              <RatingContent
                filters={filters}
                updateFilters={updateFilters}
                onClose={closePopover}
              />
            </div>
          )}
        </FilterButton>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear All ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Mobile Filter Bar */}
      <div className="sm:hidden mb-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-medium text-gray-900">Results</h3>
            <span className="text-xs text-gray-500">({DATA_LENGTH} found)</span>
          </div>
          <MobileFiltersModal
            filters={filters}
            updateFilters={updateFilters}
            clearAllFilters={clearAllFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <ActiveFiltersDisplay
          {...{ filters, updateFilters, categoryData, loadingCategories }}
        />
      )}
    </div>
  );
}
