import { useState, useEffect, useRef } from "react";

const useMultiLine = () => {
  const elementRef = useRef(null);
  const [isMultiLine, setIsMultiLine] = useState(false);

  useEffect(() => {
    const checkIfMultiLine = () => {
      if (elementRef.current) {
        const lineHeight = parseFloat(
          getComputedStyle(elementRef.current).lineHeight
        );
        const elementHeight = elementRef.current.offsetHeight;
        setIsMultiLine(elementHeight > lineHeight);
      }
    };

    // Check on mount
    checkIfMultiLine();

    // Check on window resize
    window.addEventListener("resize", checkIfMultiLine);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIfMultiLine);
    };
  }, []);

  return { isMultiLine, elementRef };
};

export default useMultiLine;
