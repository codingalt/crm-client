import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollRestoration = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const storedPositions =
      JSON.parse(sessionStorage.getItem("scrollPositions")) || {};

    const saveScrollPosition = () => {
      storedPositions[pathname] = window.scrollY;
      sessionStorage.setItem(
        "scrollPositions",
        JSON.stringify(storedPositions)
      );
    };

    const restoreScrollPosition = () => {
      const scrollY = storedPositions[pathname] || 0;
      window.scrollTo(0, scrollY);
    };

    window.addEventListener("beforeunload", saveScrollPosition);
    restoreScrollPosition();

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
      saveScrollPosition();
    };
  }, [pathname]);
};

export default useScrollRestoration;
