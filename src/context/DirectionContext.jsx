import React, { createContext, useState, useEffect } from "react";
import i18n from "../i18n";

const rtlLanguages = ["pk", "he"];

export const DirectionContext = createContext();

export const DirectionProvider = ({ children }) => {
  const storedLanguage = localStorage.getItem("language") || i18n.language;
  const [direction, setDirection] = useState(
    storedLanguage === "en" ? "ltr" : "rtl"
  );
  console.log(direction);

  const toggleLanguage = (language) => {
    const newLanguage = language;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    window.location.reload();
  };

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setDirection(rtlLanguages.includes(lng) ? "rtl" : "ltr");
    };

    i18n.on("languageChanged", handleLanguageChange);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <DirectionContext.Provider value={{ direction, toggleLanguage }}>
      {children}
    </DirectionContext.Provider>
  );
};
