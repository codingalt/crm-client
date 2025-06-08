import React, { useEffect, useRef, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { X } from "lucide-react";
import { Calendar1, Clock, Location, SearchNormal1 } from "iconsax-react";
import { cn } from "@/lib/utils";
import { timeSlots } from "@/data/projectData";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LocationPicker from "@/components/widgets/location-picker";
import { useGetCountriesDataQuery } from "@/services/api/general/generalApi";

const SearchForm = ({
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
}) => {
  const searchInputRef = useRef();
  const navigate = useNavigate();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Get Locations Data
  const { data: locations } = useGetCountriesDataQuery();

  useEffect(() => {
    if (searchText) {
      searchInputRef?.current.focus();
    }
  }, [searchText]);

  // Prevent click propagation
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

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

  // Location helper functions
  const getLocationDisplay = () => {
    if (locationData.latitude && locationData.longitude) {
      return "Current Location";
    }

    if (locationData.country && locationData.city) {
      const country = locations?.countries?.find(
        (c) => c.id === parseInt(locationData.country)
      );

      const city = locationData.city
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

  const selectTime = (time) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  const getTimeDisplay = () => {
    if (!selectedTime) return "Any time";
    return selectedTime;
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isTomorrow = (date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()
    );
  };

  return (
    <div className="w-full">
      <div
        className="py-7 md:p-0 border-b-1 border-gray-200 min-h-[310px] md:min-h-max md:h-[66px] flex flex-col gap-3.5 md:gap-0 md:flex-row md:items-center"
        onClick={handleContentClick}
      >
        {/* Service Selector - 25% width */}
        <div className="w-full flex items-center md:w-1/4 h-full">
          <div
            className={cn(
              "w-full relative h-full hover:bg-accent transition-all rounded-tl-2xl"
            )}
          >
            <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2">
              <SearchNormal1 className="!h-5 !w-5 text-gray-800" />
            </div>
            <input
              type="text"
              ref={searchInputRef}
              value={searchText}
              onChange={handleSearchChange}
              maxLength={70}
              placeholder="All treatments"
              className="w-full h-full px-11 pt-0.5 pr-0 text-sm placeholder:text-gray-700 placeholder:font-medium placeholder:truncate focus:placeholder:opacity-0 rounded-tl-2xl border-none focus:bg-accent focus:outline-none outline-none bg-transparent"
              onClick={(e) => e.stopPropagation()}
            />
            {searchText && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchText("");
                }}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>

          <div className="h-[24px] w-[1px] bg-gray-200 rounded-full"></div>
        </div>

        {/* Location Selector - 25% width */}
        <div className="w-full flex items-center md:w-1/4 h-full">
          <Popover
            open={showLocationPicker}
            onOpenChange={setShowLocationPicker}
          >
            <PopoverTrigger asChild className="w-full h-full">
              <Button
                variant="ghost"
                className={cn(
                  "relative flex justify-start items-center gap-2 md:rounded-none rounded-lg border md:border-none h-14 md:h-full pl-4 w-full text-left",
                  showLocationPicker
                    ? "bg-accent"
                    : "bg-white md:bg-transparent"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <Location className="!h-5 !w-5 text-gray-800" />
                <span className="truncate text-gray-700">
                  {getLocationDisplay()}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-80 p-4 py-2"
              align="start"
              onClick={(e) => e.stopPropagation()}
            >
              <LocationPicker
                value={locationData}
                onChange={handleLocationChange}
                onClose={handleLocationPickerClose}
                showApplyButton={false}
                autoApply={true}
              />
            </PopoverContent>
          </Popover>

          <div className="h-[24px] w-[1px] bg-gray-200 rounded-full"></div>
        </div>

        {/* Date and Time Section - Combined 25% width */}
        <div className="w-full h-full md:w-1/2 flex gap-3 md:gap-0 flex-row">
          {/* Date Selector - Equal width in the container */}
          <div className="w-full flex items-center h-full md:w-1/2">
            <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
              <PopoverTrigger asChild className="w-full">
                <Button
                  variant="ghost"
                  className={cn(
                    "relative flex justify-start items-center gap-3 pl-4 md:rounded-none rounded-lg border md:border-none h-14 md:h-full w-full text-left",
                    showDatePicker ? "bg-accent" : "bg-white md:bg-transparent"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Calendar1 className="!h-5 !w-5 text-gray-800" />
                  <span className="truncate text-gray-700">
                    {date ? format(date, "PPP") : "Any date"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto md:w-[420px] p-0"
                align="start"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-5 pb-4 flex flex-wrap gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
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
                    onClick={(e) => {
                      e.stopPropagation();
                      selectToday();
                    }}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "rounded-full hover:bg-gray-50 border-gray-300",
                      date &&
                        isToday(date) &&
                        "bg-hintPrimary text-white hover:text-white hover:bg-hintPrimary/90"
                    )}
                  >
                    Today
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectTomorrow();
                    }}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "rounded-full hover:bg-gray-50 border-gray-300",
                      date &&
                        isTomorrow(date) &&
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
                  // onDayClick={(e) => e.stopPropagation()}
                />
              </PopoverContent>
            </Popover>

            <div className="h-[24px] w-[1px] bg-gray-200 rounded-full"></div>
          </div>

          {/* Time Selector - Equal width in the container */}
          <div className="w-full h-full md:w-1/2">
            <Popover open={showTimePicker} onOpenChange={setShowTimePicker}>
              <PopoverTrigger asChild className="w-full">
                <Button
                  variant="ghost"
                  className={cn(
                    "relative flex justify-start items-center gap-2 pl-4 md:rounded-none rounded-lg border md:border-none h-14 md:h-full w-full text-left",
                    showTimePicker ? "bg-accent" : "bg-white md:bg-transparent"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Clock className="!h-5 !w-5 text-gray-800" />
                  <span className="truncate text-gray-700">
                    {getTimeDisplay()}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto lg:w-[300px] p-4"
                align="start"
                onClick={(e) => e.stopPropagation()}
              >
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
            className="h-[48px] w-full min-w-[52px] z-10 text-lg md:text-base lg:text-lg rounded-lg md:rounded-full md:px-5 px-8 bg-hintPrimary hover:bg-hintPrimary/90"
            onClick={(e) => {
              e.stopPropagation();
              handleSearch();
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
