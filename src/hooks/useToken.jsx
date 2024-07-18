import { useState, useEffect } from "react";

const useToken = () => {
  const [token, setToken] = useState(localStorage.getItem("crmClientToken"));

  useEffect(() => {
    const handleTokenChange = () => {
      setToken(localStorage.getItem("crmClientToken"));
    };

    // Custom event to handle token change
    window.addEventListener("tokenChanged", handleTokenChange);

    return () => {
      window.removeEventListener("tokenChanged", handleTokenChange);
    };
  }, []);

  return token;
};

export default useToken;
