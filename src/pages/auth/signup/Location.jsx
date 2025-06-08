import React, { useRef, useState } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { reverseGeocodeLatLng } from "@/utils/helpers/geoCode";
import { Field } from "formik";
import _ from "lodash";
import { useSelector } from "react-redux";
import { Skeleton } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

const bounds = {
  east: -110,
  north: 40,
  south: 35,
  west: -120,
};

const Location = ({ errors, touched, setFieldValue, setIsAddressError }) => {
  const { t } = useTranslation();
  const { isLoaded } = useSelector((state) => state.auth);
  const [searchBox, setSearchBox] = useState(null);
  const [searchBoxBounds, setSearchBoxBounds] = useState(null);
  const [selectedVal, setSelectedVal] = useState("");
  const inputRef = useRef();

  const onLoadSearchBox = (ref) => {
    setSearchBox(ref);
  };

  async function onPlacesChanged() {
    const places = searchBox.getPlaces();
    if (places.length > 0) {
      const selectedPlace = places[0];

      if (selectedPlace.geometry && selectedPlace.geometry.viewport) {
        // Update map bounds to fit the selected place
        const viewport = selectedPlace.geometry.viewport;
        setSearchBoxBounds({
          east: viewport.getNorthEast().lng(),
          north: viewport.getNorthEast().lat(),
          south: viewport.getSouthWest().lat(),
          west: viewport.getSouthWest().lng(),
        });

        const location = selectedPlace.geometry.location;
        const latLng = { lat: location.lat(), lng: location.lng() };
        setSelectedVal(selectedPlace.formatted_address);
        const res = await reverseGeocodeLatLng(latLng);
        setFieldValue("latLng", `${location.lat()},${location.lng()}`);
        setFieldValue("address", selectedPlace.formatted_address);
        setFieldValue("country", res.country);
        setFieldValue("city", res.city);
        setIsAddressError(false);
      }
    }
  }

  const handleChange = (e) => {
    setSelectedVal(e.target.value);
  };

  return (
    <>
      {isLoaded ? (
        <div className="w-full">
          <StandaloneSearchBox
            bounds={searchBoxBounds || bounds}
            onLoad={onLoadSearchBox}
            onPlacesChanged={() => onPlacesChanged()}
          >
            <Field
              innerRef={inputRef}
              type="text"
              id="address"
              name="address"
              placeholder={t("searchAddress")}
              className={
                errors.address && touched.address && "inputBottomBorder"
              }
              value={selectedVal}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </StandaloneSearchBox>
        </div>
      ) : (
        <Skeleton className="h-12 w-full rounded-md" />
      )}
    </>
  );
};

export default Location;
