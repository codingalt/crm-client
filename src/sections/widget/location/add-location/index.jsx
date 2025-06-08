import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import GoogleMapLocation from "./google-map-location";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setLocationChanged, setUserLocation } from "@/services/slices/auth/authSlice";
import css from "./add-location.module.scss";
import { IoLocationSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";
import { DirectionContext } from "@/context/DirectionContext";
import { geocodeLatLng } from "@/utils/helpers/geoCode";

const AddLocationModal = ({ isOpen, onOpenChange }) => {
  const { t } = useTranslation();
  const { direction } = useContext(DirectionContext);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const { location, isLocationChanged } = useSelector((store) => store.auth);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const [resultArr, setResultArr] = useState([]);
  const inputRef = useRef(null);
  const loc = JSON.parse(localStorage.getItem("userLocation"));  

  const handlePlaceChanged = async(value) => {
    setResultArr([]);

    // Initialize the Places Service
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    // Get details for the selected place
    service.getDetails({ placeId: value.place_id }, async(place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const latLng = place.geometry.location;

        // Get City and Country with latlng
        const res = await geocodeLatLng({
          lat: latLng.lat(),
          lng: latLng.lng(),
        });
        
        // Set the selected address and location
        setSelectedAddress({
          address: value.description,
          previewAddress: value.description,
          lat: latLng.lat(),
          lng: latLng.lng(),
          city: res.city,
          country: res.country
        });
      }
    });
  };

  const handleInput = (e) => {
    if (e.target.value === "") {
      setResultArr([]);
      return;
    }

    // inputRef.current.value = e.target.value;
    

    // eslint-disable-next-line no-undef
    const service = new google.maps.places.AutocompleteService();
    service.getQueryPredictions({ input: e.target.value }, (suggestions) => {
      setResultArr(suggestions);
    });
  };

  useEffect(() => {
    if (location && inputRef.current) {
      inputRef.current.value = location.previewAddress;
    }
  }, [isOpen,location]);

  useEffect(() => {
    if (selectedAddress) {
      
      dispatch(
        setUserLocation({
          previewAddress: selectedAddress.address,
          lat: selectedAddress.lat,
          lng: selectedAddress.lng,
          city: selectedAddress.city,
          country: selectedAddress.country,
        })
      );
    }
  }, [selectedAddress]);

  function sendMessageToFlutter(message) {
    if (
      window.Location &&
      typeof window.Location.postMessage === "function"
    ) {
      window.Location.postMessage(message);
    }
  }


  const handleConfirm = () => {
    dispatch(setUserLocation(selectedAddress));
    localStorage.setItem("userLocation", JSON.stringify(selectedAddress));
    
    sendMessageToFlutter(selectedAddress);
    dispatch(setLocationChanged(!isLocationChanged));
    onOpenChange(false);
  };

  return (
    <Modal
      className="z-[9999] -top-1 shadow-lg max-w-[88%] md:max-w-2xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={isSmallDevice ? "center" : "top"}
      hideCloseButton
      onClose={() => {
        dispatch(
          setUserLocation({
            ...location,
            previewAddress: location.address,
            lat: loc.lat,
            lng: loc.lng,
          })
        );
      }}
      dir={direction}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center pt-3">
                <div className="flex md:items-center gap-1 mb-4">
                  <span className="text-[#01ABAB] text-lg md:text-2xl mt-1 md:mt-0">
                    <HiOutlineLocationMarker />
                  </span>
                  <p>{t("addAddressToView")}</p>
                </div>

                <div
                  onClick={() => {
                    onClose();
                  }}
                  className="w-6 h-6 mb-4 rounded-full bg-blue-50 text-default-700 text-medium cursor-pointer hidden md:flex items-center justify-center"
                >
                  <IoClose />
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-full items-center gap-3 md:gap-4">
                <div className="w-full relative">
                  <input
                    ref={inputRef}
                    type="text"
                    id="inputAddress"
                    onChange={(e) => handleInput(e)}
                    placeholder={t("enterYourLocation")}
                    className="w-full h-14 rounded-md text-[14px] md:text-[16px] font-medium outline-none border pl-8"
                    style={{
                      paddingLeft: "1rem",
                    }}
                  />

                  <div className={`${css.autocomplete} shadow`}>
                    {resultArr?.length != 0 &&
                      resultArr?.map((item, i) => {
                        return (
                          <div
                            className={css.itemValue}
                            key={i}
                            onClick={() => handlePlaceChanged(item)}
                          >
                            <div className={css.icon}>
                              <IoLocationSharp />
                            </div>
                            <div className={css.text}>
                              <span>
                                {item.structured_formatting.main_text}
                              </span>
                              <span>
                                {item.structured_formatting.secondary_text}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <Button
                  radius={isSmallDevice ? "sm" : "md"}
                  className="mb-2 md:mb-0 w-full md:w-[25px] h-[47px] md:h-[55px] text-medium md:text-2xl bg-[#01ABAB] text-white"
                  onClick={handleConfirm}
                >
                  <p className="md:hidden">{t("confirmLocation")}</p>
                  {direction === "rtl" ? <FaArrowLeft /> : <FaArrowRight />}
                </Button>
              </div>
            </ModalHeader>
            <ModalBody className="rounded-lg">
              <GoogleMapLocation
                location={location}
                setSelectedAddress={setSelectedAddress}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddLocationModal;
