import React, { createContext, useContext, useState } from "react";

const MainContext = createContext(null);

export const MainProvider = ({ children }) => {
    const [showSearch, setShowSearch] = useState(false);

  return (
    <MainContext.Provider value={{showSearch, setShowSearch}}>{children}</MainContext.Provider>
  );
};

export const useMainContext = () => {
  return useContext(MainContext);
};
