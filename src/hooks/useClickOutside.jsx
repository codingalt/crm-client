import { useEffect } from "react";

const useClickOutside = (ref, callback, excludeRef = null) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If ref doesn't exist or if the clicked target is within the ref, do nothing
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // If excludeRef exists and the clicked target is within the excludeRef, do nothing
      if (excludeRef?.current && excludeRef.current.contains(event.target)) {
        return;
      }

      // Otherwise, trigger the callback
      callback();
    };

    // Listen for both mouse and touch events
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, callback, excludeRef]);
};

export default useClickOutside;
