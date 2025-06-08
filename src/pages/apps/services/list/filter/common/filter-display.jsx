import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import dayjs from "dayjs";
import { useGetCountriesDataQuery } from "@/services/api/general/generalApi";
import { sortOptions } from "../data";

const ActiveFiltersDisplay = ({
  filters,
  updateFilters,
  categoryData,
  loadingCategories,
}) => {
  // Countries Data
  const { data: locationsData, isLoading: loadingLocations } =
    useGetCountriesDataQuery();

  const getLocationDisplay = () => {
    if (filters.latitude && filters.longitude) {
      return "Current Location";
    }

    let country;
    let city;

    if (filters.country_id) {
      country = locationsData?.countries?.find(
        (c) => c.id === parseInt(filters.country_id)
      );

      city = filters.city_id
        ? locationsData?.cities?.find((c) => c.id === parseInt(filters.city_id))
        : null;

      return city ? `${city?.name}, ${country?.name}` : `${country?.name}`;
    }

    if (filters.city_id) {
      city = locationsData?.cities?.find(
        (c) => c.id === parseInt(filters.city_id)
      );
      return `${city?.name}`;
    }
  };

  const getCategoryDisplay = () => {
    if (filters.selectedCategory) {
      const category = categoryData?.categories?.find(
        (c) => c.id === parseInt(filters.selectedCategory)
      );
      return `${category?.name}`;
    }
  };

  return (
    <div className="pt-1.5 md:pt-4 pb-1 md:pb-2">
      <div className="flex flex-wrap gap-2.5">
        {filters.sort !== "popular" && (
          <Badge
            variant="secondary"
            className="flex items-center px-3 py-1.5 md:py-1 rounded-full gap-2.5 bg-gray-100 !font-medium text-xs md:text-sm justify-center"
          >
            <span className="capitalize">
              {sortOptions?.find((item) => item.value == filters?.sort)
                ?.label || "Most Popular"}
            </span>
            <X
              className="w-4 h-4 cursor-pointer text-gray-700"
              onClick={() => updateFilters({ sort: "popular" })}
            />
          </Badge>
        )}

        {!loadingCategories && filters.selectedCategory && (
          <Badge
            variant="secondary"
            className="flex items-center px-3 py-1.5 md:py-1 rounded-full gap-2.5 bg-gray-100 !font-medium text-xs md:text-sm justify-center"
          >
            {getCategoryDisplay()}
            <X
              className="w-4 h-4 cursor-pointer text-gray-700"
              onClick={() =>
                updateFilters({
                  selectedCategory: null,
                })
              }
            />
          </Badge>
        )}

        {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 500) && (
          <Badge
            variant="secondary"
            className="flex items-center px-3 py-1.5 md:py-1 rounded-full gap-2.5 bg-gray-100 !font-medium text-xs md:text-sm justify-center"
          >
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
            <X
              className="w-4 h-4 cursor-pointer text-gray-700"
              onClick={() =>
                updateFilters({
                  priceRange: [0, 500],
                  priceMin: "",
                  priceMax: "",
                })
              }
            />
          </Badge>
        )}

        {filters.selectedDate && (
          <Badge
            variant="secondary"
            className="flex items-center px-3 py-1.5 md:py-1 rounded-full gap-2.5 bg-gray-100 !font-medium text-xs md:text-sm justify-center"
          >
            {dayjs(filters.selectedDate).format("MMM D, YYYY")}
            <X
              className="w-4 h-4 cursor-pointer text-gray-700"
              onClick={() => updateFilters({ selectedDate: undefined })}
            />
          </Badge>
        )}

        {filters.timeSlot && (
          <Badge
            variant="secondary"
            className="flex items-center capitalize px-3 py-1.5 md:py-1 rounded-full gap-2.5 bg-gray-100 !font-medium text-xs md:text-sm justify-center"
          >
            {filters.timeSlot}
            <X
              className="w-4 h-4 cursor-pointer text-gray-700"
              onClick={() =>
                updateFilters({
                  timeSlot: undefined,
                })
              }
            />
          </Badge>
        )}

        {filters.selectedRating !== null && (
          <Badge
            variant="secondary"
            className="flex items-center px-3 py-1.5 md:py-1 rounded-full gap-2.5 bg-gray-100 !font-medium text-xs md:text-sm justify-center"
          >
            {filters.selectedRating}+ stars
            <X
              className="w-4 h-4 cursor-pointer text-gray-700"
              onClick={() =>
                updateFilters({
                  selectedRating: null,
                })
              }
            />
          </Badge>
        )}

        {!loadingLocations &&
          (filters.latitude || filters.country_id || filters.city_id) && (
            <Badge
              variant="secondary"
              className="flex items-center px-3 py-1.5 md:py-1 rounded-full gap-2.5 bg-gray-100 !font-medium text-xs md:text-sm justify-center"
            >
              {getLocationDisplay()}
              <X
                className="w-4 h-4 cursor-pointer text-gray-700"
                onClick={() =>
                  updateFilters({
                    country_id: null,
                    city_id: null,
                    latitude: null,
                    longitude: null,
                  })
                }
              />
            </Badge>
          )}
      </div>
    </div>
  );
};

export default ActiveFiltersDisplay;
