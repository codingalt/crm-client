import { useEffect, useState } from "react";
import { ChevronsUpDown, MousePointer2, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useGetCountriesDataQuery } from "@/services/api/general/generalApi";
import useLocation from "@/hooks/useLocation";
import { cn } from "@/lib/utils";

/**
 * Reusable LocationPicker Component
 *
 * @param {Object} props
 * @param {Object} props.value - Current location values
 * @param {number|null} props.value.latitude - Current latitude
 * @param {number|null} props.value.longitude - Current longitude
 * @param {string|number|null} props.value.country - Selected country ID
 * @param {string|number|null} props.value.city - Selected city ID
 * @param {Function} props.onChange - Callback when location changes
 * @param {Function} props.onClose - Optional callback when picker closes
 * @param {boolean} props.showApplyButton - Whether to show Apply/Clear buttons (default: true)
 * @param {boolean} props.autoApply - Whether to auto-apply changes without Apply button (default: false)
 * @param {string} props.className - Additional CSS classes
 */
export default function LocationPicker({
  value = {},
  onChange,
  onClose,
  showApplyButton = true,
  autoApply = false,
  className = "",
}) {
  const [currentLocation, setCurrentLocation] = useState(
    value.latitude
      ? { latitude: value.latitude, longitude: value.longitude }
      : null
  );
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(
    value.latitude ? true : false
  );
  const [selectedCountry, setSelectedCountry] = useState(value?.country || "");
  const [selectedCity, setSelectedCity] = useState(value?.city || "");
  const [openCountryCombo, setOpenCountryCombo] = useState(false);
  const [openCityCombo, setOpenCityCombo] = useState(false);

  useEffect(() => {
    if (value.country) {
      setSelectedCountry(String(value.country));
    }

    if (value.city) {
      setSelectedCity(String(value.city));
    }
  }, [value.country, value.city]);

  // Countries Data
  const { data: locationsData } = useGetCountriesDataQuery();

  const { loading: loadingLoc, getCurrentLocation } = useLocation();

  // Filter cities based on selected country
  const getFilteredCities = () => {
    if (!selectedCountry || !locationsData?.cities) return [];
    return locationsData.cities.filter(
      (city) => city.country_id === parseInt(selectedCountry)
    );
  };

  const filteredCities = getFilteredCities();

  const handleGetLocation = async () => {
    try {
      const locationData = await getCurrentLocation();

      // Set current location and clear manual selections
      setCurrentLocation(locationData);
      setIsUsingCurrentLocation(true);
      setSelectedCountry("");
      setSelectedCity("");

      // Auto-apply if enabled
      if (autoApply) {
        handleLocationChange({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          country: null,
          city: null,
        });
        onClose();
      }
    } catch (err) {
      console.error("Failed to get location:", err);
    }
  };

  const handleCountrySelect = (countryValue) => {
    const newCountryValue =
      countryValue === selectedCountry ? "" : countryValue;
    setSelectedCountry(newCountryValue);

    // Always clear city when country changes
    setSelectedCity("");

    // Clear current location when manually selecting
    if (countryValue !== selectedCountry) {
      setCurrentLocation(null);
      setIsUsingCurrentLocation(false);
    }
    setOpenCountryCombo(false);

    // Auto-apply if enabled
    if (autoApply) {
      handleLocationChange({
        latitude: null,
        longitude: null,
        country: newCountryValue ? parseInt(newCountryValue) : null,
        city: null,
      });
    }
  };

  const handleCitySelect = (cityValue) => {
    const newCityValue = cityValue === selectedCity ? "" : cityValue;
    setSelectedCity(newCityValue);

    // Clear current location when manually selecting
    if (cityValue !== selectedCity) {
      setCurrentLocation(null);
      setIsUsingCurrentLocation(false);
    }
    setOpenCityCombo(false);

    // Auto-apply if enabled
    if (autoApply) {
      handleLocationChange({
        latitude: null,
        longitude: null,
        country: selectedCountry ? parseInt(selectedCountry) : null,
        city: newCityValue ? parseInt(newCityValue) : null,
      });
    }
  };

  const getLocationForAPI = () => {
    if (isUsingCurrentLocation && currentLocation) {
      return {
        type: "coordinates",
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      };
    }

    if (selectedCountry || selectedCity) {
      return {
        type: "manual",
        country: selectedCountry ? parseInt(selectedCountry) : null,
        city: selectedCity ? parseInt(selectedCity) : null,
      };
    }

    return null;
  };

  const handleLocationChange = (locationData) => {
    if (onChange) {
      onChange(locationData);
    }
  };

  const handleApply = () => {
    const locationData = getLocationForAPI();

    if (locationData) {
      if (locationData.type === "coordinates") {
        handleLocationChange({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          country: null,
          city: null,
        });
      } else if (locationData.type === "manual") {
        handleLocationChange({
          latitude: null,
          longitude: null,
          country: locationData?.country || null,
          city: locationData?.city || null,
        });
      }
    } else {
      handleLocationChange({
        latitude: null,
        longitude: null,
        country: null,
        city: null,
      });
    }

    // Close the popover after applying
    if (onClose) {
      onClose();
    }
  };

  const handleClear = () => {
    setCurrentLocation(null);
    setSelectedCountry("");
    setSelectedCity("");
    setIsUsingCurrentLocation(false);

    const clearData = {
      latitude: null,
      longitude: null,
      country: null,
      city: null,
    };

    handleLocationChange(clearData);

    // Close the popover after clearing if auto-apply is enabled
    if (autoApply && onClose) {
      onClose();
    }
  };

  return (
    <div className={cn("space-y-5", className)}>
      <div>
        <button
          className={cn(
            "w-full flex items-center gap-3 py-2 p-2.5 transition-all hover:bg-gray-50 cursor-pointer rounded-md",
            isUsingCurrentLocation && "bg-blue-50 border border-blue-200"
          )}
          onClick={handleGetLocation}
          disabled={loadingLoc}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              isUsingCurrentLocation
                ? "text-blue-600 bg-blue-100"
                : "text-hintPrimary bg-hintSecondary"
            )}
          >
            <MousePointer2 className="size-5" />
          </div>
          <div className="flex flex-col items-start">
            <span
              className={cn(
                "font-medium",
                isUsingCurrentLocation && "text-blue-700"
              )}
            >
              {loadingLoc ? "Getting Location..." : "Current Location"}
            </span>
            {isUsingCurrentLocation && currentLocation && (
              <span className="text-xs text-blue-600">Using GPS location</span>
            )}
          </div>
        </button>
        <div className="h-[1px] my-1.5 bg-gray-200 w-full"></div>

        <div className="mt-1 p-2.5">
          <p className="font-medium text-sm text-gray-600">Choose another</p>

          <div className="flex flex-col gap-3 mt-3">
            {/* Select Country  */}
            <Popover open={openCountryCombo} onOpenChange={setOpenCountryCombo}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCountryCombo}
                  className="w-full h-11 justify-between"
                >
                  {selectedCountry
                    ? locationsData?.countries?.find(
                        (item) => item.id === parseInt(selectedCountry)
                      )?.name
                    : "Country"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {locationsData?.countries?.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.name}
                          onSelect={() =>
                            handleCountrySelect(item.id.toString())
                          }
                        >
                          {item.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedCountry === item.id.toString()
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Select City  */}
            <Popover open={openCityCombo} onOpenChange={setOpenCityCombo}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCityCombo}
                  className="w-full h-11 justify-between"
                  disabled={!selectedCountry}
                >
                  {selectedCity
                    ? filteredCities?.find(
                        (item) => item.id === parseInt(selectedCity)
                      )?.name
                    : "City"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                  <CommandInput placeholder="Search city..." />
                  <CommandList>
                    <CommandEmpty>No city found.</CommandEmpty>
                    <CommandGroup>
                      {filteredCities?.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.name}
                          onSelect={() => handleCitySelect(item.id.toString())}
                        >
                          {item.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedCity === item.id.toString()
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Apply and Clear Buttons */}
      {showApplyButton && (
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="ghost" className="flex-1 h-11" onClick={handleClear}>
            Clear all
          </Button>
          <Button className="flex-1 h-11" onClick={handleApply}>
            Apply
          </Button>
        </div>
      )}
    </div>
  );
}
