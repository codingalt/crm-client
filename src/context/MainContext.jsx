import { useDisclosure } from "@nextui-org/react";
import React, { createContext, useContext, useState } from "react";

const MainContext = createContext(null);

export const MainProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const { isOpen: isOpenLocationModal, onOpen: onOpenLocationModal, onOpenChange: onOpenChangeLocationModal } = useDisclosure();

  return (
    <MainContext.Provider
      value={{
        showSearch,
        setShowSearch,
        isOpenLocationModal,
        onOpenLocationModal,
        onOpenChangeLocationModal,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  return useContext(MainContext);
};
