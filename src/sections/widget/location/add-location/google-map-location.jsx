import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { geocodeLatLng } from "@/utils/helpers/geoCode";
import { useSelector } from "react-redux";
import pin from "@/assets/pin.png";
import { Button } from "@nextui-org/react";
import _ from "lodash";
import { useTranslation } from "react-i18next";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const divStyle = {
  background: `white`,
  padding: 5,
  width: "auto",
};

// Default location (latitude and longitude of New York City)
const defaultLocation = { lat: 40.7128, lng: -74.006 };

const GoogleMapLocation = ({ location, setSelectedAddress }) => {
  const { t } = useTranslation();
  const { isLoaded } = useSelector((state) => state.auth);
  const [infoWindow, setInfoWindow] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultLocation);
  const [mapRef, setMapRef] = useState();
  const [isConfirmButton, setIsConfirmButton] = useState(false);

  useEffect(() => {
    if (location) {
      setMapCenter({ lat: location.lat, lng: location.lng });
    }
  }, [location]);

  const handleDragEnd = () => {
    if (mapRef) {
      setIsConfirmButton(true);
    }
  };

  const handleConfirmLocation = async () => {
    setIsConfirmButton(false);
    const res = await geocodeLatLng(mapRef.getCenter());

    setSelectedAddress({
      address: res.address,
      previewAddress: res.address,
      lat: mapCenter?.lat(),
      lng: mapCenter?.lng(),
    });
  };

  return (
    <>
      <div
        style={{
          margin: "13px auto",
          marginTop: "0px",
          width: "100%",
          borderRadius: "20px",
          position: "relative",
        }}
        className="h-[300px] md:h-[400px]"
      >
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={15}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              zoomControl: true,
            }}
            onLoad={(map) => {
              setMapRef(map);
            }}
            onIdle={() => mapRef && setMapCenter(mapRef.getCenter())}
            onDragEnd={handleDragEnd}
          >
            {mapCenter && <Marker position={mapCenter} icon={pin} />}

            {isConfirmButton && (
              <div
                style={{ position: "absolute", bottom: "1rem", left: "1rem" }}
              >
                <Button
                  onClick={handleConfirmLocation}
                  color="primary"
                  size="md"
                  radius="sm"
                >
                  {t("confirmLocation")}
                </Button>
              </div>
            )}

            {infoWindow && (
              <InfoWindow position={mapCenter}>
                <div style={divStyle}>
                  <p>{infoWindow}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default GoogleMapLocation;
