import { toastError } from "@/components/common/toast/Toast";
import { useState, useCallback } from "react";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = useCallback((options = {}) => {
    return new Promise((resolve, reject) => {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        const errorMsg = "Geolocation is not supported by this browser.";
        toastError(errorMsg);
        setError(errorMsg);
        reject(new Error(errorMsg));
        return;
      }

      setLoading(true);
      setError(null);

      const defaultOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
        ...options,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          };

          setLocation(locationData);
          setLoading(false);
          resolve(locationData);
        },
        (error) => {
          setLoading(false);

          let errorMessage;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                "Enable location in browser settings to use this feature.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage =
                "Location information is unavailable. Please check your GPS or internet connection.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out. Please try again.";
              break;
            default:
              errorMessage =
                "An unknown error occurred while retrieving your location.";
              break;
          }

          toastError(errorMessage);
          setError(errorMessage);
          reject(error);
        },
        defaultOptions
      );
    });
  }, []);

  // Function to clear location data
  const clearLocation = useCallback(() => {
    setLocation(null);
    setError(null);
  }, []);

  // Function to get location without showing alerts (for silent requests)
  const getLocationSilently = useCallback((options = {}) => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }

      setLoading(true);
      setError(null);

      const defaultOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
        ...options,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          };

          setLocation(locationData);
          setLoading(false);
          resolve(locationData);
        },
        (error) => {
          setLoading(false);
          setError(error.message);
          reject(error);
        },
        defaultOptions
      );
    });
  }, []);

  return {
    location,
    loading,
    error,
    getCurrentLocation,
    getLocationSilently,
    clearLocation,
    isLocationAvailable: !!location,
  };
};

export default useLocation;
