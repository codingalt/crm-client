import React, { useState, useEffect, useRef } from "react";
import { Gallery } from "iconsax-react";

const ImagePlaceholder = ({
  src,
  alt = "Image",
  width = "100%",
  height = "auto",
  fallbackIcon = true,
  aspectRatio = "auto",
  className = "",
  rounded = "none",
  loadingEffect = "pulse",
  transitionDuration = 600,
  transitionTiming = "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDelay = 150,
  fadeWithScale = true,
  onLoad = () => {},
  onError = () => {},
}) => {
  const [status, setStatus] = useState("initial");
  const imageRef = useRef(null);
  const prevSrcRef = useRef(src);
  const hasLoaded = useRef(false);
  const imageLoaderRef = useRef(null);

  // Generate rounded corner classes
  const getRoundedClass = () => {
    const roundedOptions = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    };
    return roundedOptions[rounded] || "rounded-none";
  };

  // Generate animation classes
  const getAnimationClass = () => {
    if (status !== "loading") return "";
    const animationOptions = {
      pulse: "animate-pulse",
      shimmer:
        "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] animate-shimmer",
      none: "",
    };
    return animationOptions[loadingEffect] || "animate-pulse";
  };

  // Check if image is already cached/available
  const checkImageCache = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();

      // Set a timeout to prevent hanging
      const timeout = setTimeout(() => {
        resolve(false);
      }, 100); // Very short timeout for cache check

      img.onload = () => {
        clearTimeout(timeout);
        resolve(true);
      };

      img.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };

      img.src = imageSrc;

      // If image loads synchronously (cached), it's already available
      if (img.complete && img.naturalWidth > 0) {
        clearTimeout(timeout);
        resolve(true);
      }
    });
  };

  // Handle image loading
  useEffect(() => {
    // Skip processing if src hasn't changed
    if (prevSrcRef.current === src && status !== "initial") {
      return;
    }

    prevSrcRef.current = src;
    hasLoaded.current = false;

    if (!src) {
      setStatus("error");
      onError();
      return;
    }

    // Check if image is already cached before showing loading state
    const loadImage = async () => {
      const isCached = await checkImageCache(src);

      if (isCached) {
        // Image is cached, skip loading state
        setStatus("loaded");
        onLoad();
      } else {
        // Image not cached, show loading state
        setStatus("loading");
      }
    };

    loadImage();

    return () => {
      // Cleanup
      if (imageLoaderRef.current) {
        imageLoaderRef.current = null;
      }
    };
  }, [src, onLoad, onError]);

  // Direct event handlers on the image element
  const handleLoad = () => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      setStatus("loaded");
      onLoad();
    }
  };

  const handleError = () => {
    setStatus("error");
    onError();
  };

  // For custom shimmer animation
  useEffect(() => {
    if (loadingEffect === "shimmer") {
      const styleId = "shimmer-animation-style";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
          @keyframes shimmer {
            0% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-shimmer {
            animation: shimmer 2.5s infinite linear;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, [loadingEffect]);

  // Fallback icon component
  const FallbackIcon = () => (
    <div className="text-gray-500 flex items-center justify-center h-full w-full">
      <Gallery />
    </div>
  );

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${getRoundedClass()} ${className}`}
      style={{
        position: "relative",
        width,
        height: height === "auto" ? "auto" : height,
        aspectRatio: height === "auto" ? aspectRatio : "auto",
      }}
    >
      {/* Placeholder/loading state - only show when actually loading */}
      {status === "loading" && (
        <div
          className={`absolute bg-gray-200 inset-0 ${getRoundedClass()} ${getAnimationClass()}`}
        />
      )}

      {/* Error state with fallback icon */}
      {status === "error" && fallbackIcon && (
        <div
          className={`absolute bg-gray-200 inset-0 flex items-center justify-center ${getRoundedClass()}`}
        >
          <FallbackIcon />
        </div>
      )}

      {/* Actual image */}
      {src && (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          } ${getRoundedClass()}`}
          style={{
            position: "relative",
            zIndex: 1,
            display: "block",
            transition: `opacity ${transitionDuration}ms ${transitionTiming} ${transitionDelay}ms, 
                        transform ${transitionDuration}ms ${transitionTiming} ${transitionDelay}ms`,
            transform:
              status === "loaded"
                ? "scale(1)"
                : fadeWithScale
                ? "scale(1.05)"
                : "scale(1)",
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default ImagePlaceholder;