import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { LayoutGrid } from "lucide-react";
import { Calendar1, Clock, Location, SearchNormal1 } from "iconsax-react";
import { cn } from "@/lib/utils";
import { useGetGlobalCategoriesQuery } from "@/services/api/categoriesApi/categoriesApi";
import { Skeleton } from "@/components/ui/skeleton";
import ImagePlaceholder from "@/components/ui/imae-placeholder";
import { timeSlots } from "@/data/projectData";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LocationPicker from "@/components/widgets/location-picker";
import { useGetCountriesDataQuery } from "@/services/api/general/generalApi";

const SearchForm = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Get Locations Data
  const { data: locations } = useGetCountriesDataQuery();

  // Location state
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    country: null,
    city: null,
  });

  // Get categories
  const { data: categories, isLoading: loadingCategories } =
    useGetGlobalCategoriesQuery();

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setShowDatePicker(false);
  };

  const selectToday = () => {
    setDate(new Date());
    setShowDatePicker(false);
  };

  const selectTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow);
    setShowDatePicker(false);
  };

  const selectCategory = (categoryName, categoryId = null) => {
    setSelectedCategory(categoryName);
    setSelectedCategoryId(categoryId);
    setShowCategories(false);
  };

  const selectTime = (time) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  const getTimeDisplay = () => {
    if (!selectedTime) return "Any time";
    return selectedTime;
  };

  // Location helper functions
  const getLocationDisplay = () => {
    if (locationData.latitude && locationData.longitude) {
      return "Current Location";
    }

    if (locationData.country && locationData.city) {
      const country = locations?.countries?.find(
        (c) => c.id === parseInt(locationData.country)
      );

      const city = filters.city
        ? locations?.cities?.find((c) => c.id === parseInt(locationData.city))
        : null;

      return city ? `${city?.name}, ${country?.name}` : `${country?.name}`;
    }

    if (locationData.country) {
      const country = locations?.countries?.find(
        (c) => c.id === parseInt(locationData.country)
      );
      return country?.name;
    }

    return "Select Location";
  };

  const handleLocationChange = (newLocationData) => {
    setLocationData(newLocationData);
  };

  const handleLocationPickerClose = () => {
    setShowLocationPicker(false);
  };

  const handleSearch = () => {
    const searchParams = {
      category_id: selectedCategoryId || undefined,
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

    // Navigate with search params
    navigate({
      pathname: "/services",
      search: createSearchParams(cleanParams).toString(),
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-9 md:mt-8">
      <div className="bg-white rounded-lg md:rounded-full overflow-hidden py-7 px-4 md:p-0 min-h-[310px] md:min-h-max md:h-[70px] flex flex-col gap-3.5 md:gap-0 md:flex-row md:items-center shadow-md">
        {/* Service Selector - 25% width */}
        <div className="w-full md:w-1/4 h-full flex items-center">
          <Popover open={showCategories} onOpenChange={setShowCategories}>
            <PopoverTrigger asChild className="w-full">
              <Button
                variant="ghost"
                className={cn(
                  "relative flex justify-start items-center gap-3.5 md:rounded-none rounded-lg border md:border-none h-14 md:h-full pl-5 w-full text-left md:rounded-l-full",
                  showCategories ? "bg-accent" : "bg-white"
                )}
              >
                <SearchNormal1 className="!h-5 !w-5 text-gray-800" />
                <span className="truncate text-gray-700">
                  {selectedCategory}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-80 md:w-[400px] p-0 border overflow-hidden"
              align="start"
              sideOffset={0}
              avoidCollisions={false}
              forceBottom={true}
            >
              <div className="py-1 pb-3 max-h-[320px] overflow-y-auto">
                <div className="p-2">
                  <div
                    className="flex items-center gap-3 p-3 py-2.5 hover:bg-gray-50 transition-all cursor-pointer rounded-lg"
                    onClick={() => selectCategory("All categories", null)}
                  >
                    <div className="h-10 w-10 flex items-center justify-center text-hintPrimary border border-gray-300 rounded-sm">
                      <LayoutGrid />
                    </div>
                    <span>All categories</span>
                  </div>
                </div>

                {loadingCategories?.length > 0 && (
                  <div className="px-4 py-1 text-sm font-medium text-gray-700">
                    Top categories
                  </div>
                )}

                {loadingCategories
                  ? [1, 2, 3].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 py-2.5 p-3 transition-all rounded-lg"
                      >
                        <Skeleton className="w-10 h-10" />
                        <Skeleton className="w-28 h-3" />
                      </div>
                    ))
                  : categories?.categories?.map((category) => (
                      <div key={category.id} className="px-2">
                        <div
                          className="flex items-center gap-3 py-2.5 p-3 hover:bg-gray-50 transition-all cursor-pointer rounded-lg"
                          onClick={() =>
                            selectCategory(category.name, category.id)
                          }
                        >
                          <div className="h-10 w-10 flex items-center justify-center text-hintPrimary border border-gray-200 rounded-sm">
                            <ImagePlaceholder
                              src={
                                import.meta.env.VITE_CATEGORY_IMAGE +
                                category.image
                              }
                              rounded="md"
                              width="24px"
                              height="24px"
                              className="rounded-md w-6 h-6"
                            />
                          </div>
                          <span>{category.name}</span>
                        </div>
                      </div>
                    ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className="h-[24px] w-[1px] bg-gray-200 rounded-full hidden md:block"></div>
        </div>

        {/* Location Selector - 25% width */}
        <div className="w-full md:w-1/4 h-full flex items-center">
          <Popover
            open={showLocationPicker}
            onOpenChange={setShowLocationPicker}
          >
            <PopoverTrigger asChild className="w-full h-full">
              <Button
                variant="ghost"
                className={cn(
                  "relative flex justify-start items-center gap-3.5 md:rounded-none rounded-lg border md:border-none h-14 md:h-full pl-4 w-full text-left",
                  showLocationPicker
                    ? "bg-accent"
                    : "bg-white md:bg-transparent"
                )}
              >
                <Location className="!h-5 !w-5 text-gray-800" />
                <span className="truncate text-gray-700">
                  {getLocationDisplay()}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 py-2" align="start">
              <LocationPicker
                value={locationData}
                onChange={handleLocationChange}
                onClose={handleLocationPickerClose}
                showApplyButton={false}
                autoApply={true}
              />
            </PopoverContent>
          </Popover>

          <div className="h-[24px] w-[1px] bg-gray-200 rounded-full hidden md:block"></div>
        </div>

        {/* Date and Time Section - Combined 25% width */}
        <div className="w-full h-full md:w-1/2 flex gap-3 md:gap-0 flex-row">
          {/* Date Selector - Equal width in the container */}
          <div className="w-full h-full md:w-1/2 flex items-center">
            <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
              <PopoverTrigger asChild className="w-full">
                <Button
                  variant="ghost"
                  className={cn(
                    "relative flex justify-start items-center gap-3.5 pl-4 md:rounded-none rounded-lg border md:border-none h-14 md:h-full w-full text-left",
                    showDatePicker ? "bg-accent" : "bg-white md:bg-transparent"
                  )}
                >
                  <Calendar1 className="!h-5 !w-5 text-gray-800" />
                  <span className="truncate text-gray-700">
                    {date ? format(date, "PPP") : "Any date"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto md:w-[420px] p-0" align="start">
                <div className="p-5 pb-4 flex flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      setDate(undefined);
                      setShowDatePicker(false);
                    }}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "rounded-full hover:bg-gray-50 border-gray-300",
                      !date &&
                        "bg-hintPrimary text-white hover:text-white hover:bg-hintPrimary/90"
                    )}
                  >
                    Any date
                  </Button>
                  <Button
                    onClick={selectToday}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "rounded-full hover:bg-gray-50 border-gray-300",
                      date &&
                        date.getDate() === new Date().getDate() &&
                        date.getMonth() === new Date().getMonth() &&
                        date.getFullYear() === new Date().getFullYear() &&
                        "bg-hintPrimary text-white hover:text-white hover:bg-hintPrimary/90"
                    )}
                  >
                    Today
                  </Button>
                  <Button
                    onClick={selectTomorrow}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "rounded-full hover:bg-gray-50 border-gray-300",
                      date &&
                        date.getDate() === new Date().getDate() + 1 &&
                        date.getMonth() === new Date().getMonth() &&
                        date.getFullYear() === new Date().getFullYear() &&
                        "bg-hintPrimary text-white hover:text-white hover:bg-hintPrimary/90"
                    )}
                  >
                    Tomorrow
                  </Button>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="pointer-events-auto"
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  initialFocus
                  showOutsideDays={false}
                  fixedWeeks
                  weekStartsOn={1}
                />
              </PopoverContent>
            </Popover>

            <div className="h-[24px] w-[1px] bg-gray-200 rounded-full hidden md:block"></div>
          </div>

          {/* Time Selector - Equal width in the container */}
          <div className="w-full h-full md:w-1/2">
            <Popover open={showTimePicker} onOpenChange={setShowTimePicker}>
              <PopoverTrigger asChild className="w-full">
                <Button
                  variant="ghost"
                  className={cn(
                    "relative flex justify-start items-center gap-3 pl-4 md:rounded-none rounded-lg border md:border-none h-14 md:h-full w-full text-left",
                    showTimePicker ? "bg-accent" : "bg-white md:bg-transparent"
                  )}
                >
                  <Clock className="!h-5 !w-5 text-gray-800" />
                  <span className="truncate text-gray-700">
                    {getTimeDisplay()}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto lg:w-[300px] p-4" align="left">
                <RadioGroup
                  value={selectedTime || ""}
                  onValueChange={selectTime}
                  className="gap-0"
                >
                  {timeSlots?.map((slot) => {
                    return (
                      <label
                        key={slot.id}
                        htmlFor={slot.id}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200 cursor-pointer text-left"
                      >
                        <RadioGroupItem
                          value={slot.id}
                          id={slot.id}
                          className="w-5 h-5"
                        />
                        <div className="flex flex-col items-start">
                          <div className="text-sm font-medium text-gray-700 block">
                            {slot.label}
                          </div>
                          <p className="text-xs text-gray-500">{slot.time}</p>
                        </div>
                      </label>
                    );
                  })}
                </RadioGroup>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Search Button - 25% width */}
        <div className="w-full mt-2 md:mt-0 ml-auto md:w-[130px] flex justify-center md:justify-end md:pr-3">
          <Button
            className="h-[52px] w-full min-w-[52px] z-10 text-lg md:text-base lg:text-lg rounded-lg md:rounded-full md:px-5 px-8 bg-hintPrimary hover:bg-hintPrimary/90"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
