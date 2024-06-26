import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { FaArrowRight } from "react-icons/fa6";
import GoogleMapLocation from "./GoogleMapLocation";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../../services/slices/auth/authSlice";
import css from "./Header.module.scss";
import { IoLocationSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const AddLocationModal = ({ isOpen, onOpenChange }) => {
  const { location } = useSelector((store) => store.auth);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const [resultArr, setResultArr] = useState([]);
  const inputRef = useRef(null);
  const loc = JSON.parse(localStorage.getItem("userLocation"));

  const handlePlaceChanged = (value) => {
    setResultArr([]);

    // Initialize the Places Service
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    // Get details for the selected place
    service.getDetails({ placeId: value.place_id }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const latLng = place.geometry.location;

        // Set the selected address and location
        setSelectedAddress({
          address: value.description,
          previewAddress: value.description,
          lat: latLng.lat(),
          lng: latLng.lng(),
        });
      }
    });
  };

  const handleInput = (e) => {
    if (e.target.value === "") {
      setResultArr([]);
      return;
    }

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
  }, [location, isOpen]);

  useEffect(() => {
    if (selectedAddress) {
      dispatch(
        setUserLocation({
          previewAddress: selectedAddress.address,
          lat: selectedAddress.lat,
          lng: selectedAddress.lng,
        })
      );
    }
  }, [selectedAddress]);

  const handleConfirm = () => {
    dispatch(setUserLocation(selectedAddress));
    localStorage.setItem("userLocation", JSON.stringify(selectedAddress));
    onOpenChange(false);
  };

  return (
    <Modal
      className="z-[9999] -top-1 shadow-lg max-w-[85%] md:max-w-2xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top"
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
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 mb-4">
                  <span className="text-[#01ABAB] text-2xl">
                    <HiOutlineLocationMarker />
                  </span>
                  <p>Add address to view services</p>
                </div>

                <div
                  onClick={() => {
                    onClose();
                  }}
                  className="w-6 h-6 mb-4 rounded-full bg-blue-50 text-default-700 text-medium cursor-pointer flex items-center justify-center"
                >
                  <IoClose />
                </div>
              </div>

              <div className="flex w-full items-center gap-4">
                <div className="w-full relative">
                  <input
                    ref={inputRef}
                    type="text"
                    id="inputAddress"
                    onChange={(e) => handleInput(e)}
                    placeholder="Enter your location"
                    className="w-full h-14 rounded-md text-[16px] font-medium outline-none border pl-8"
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
                  radius="md"
                  className="w-[25px] h-[55px] bg-[#01ABAB] text-white"
                  onClick={handleConfirm}
                >
                  <FaArrowRight className="text-2xl" />
                </Button>
              </div>
            </ModalHeader>
            <ModalBody>
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
