import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";

export const ThreeDMarquee = ({ images, className }) => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [reducedImages, setReducedImages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use fewer images for better performance
  useEffect(() => {
    // Reduce the number of images to improve performance
    // We'll take fewer images on mobile for better performance
    const maxImages = isMobile ? 26 : 30;
    const sampledImages = [];

    // Evenly sample images from the original array
    for (let i = 0; i < maxImages; i++) {
      const index = Math.floor(i * (images.length / maxImages));
      sampledImages.push(images[index]);
    }

    setReducedImages(sampledImages);
  }, [images, isMobile]);

  // Only animate when in view
  useEffect(() => {
    if (isInView) {
      controls.start("animate");
    } else {
      controls.stop();
    }
  }, [isInView, controls]);

  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(reducedImages.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return reducedImages.slice(start, start + chunkSize);
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-100",
        className
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
              willChange: "transform", // Hint to browser to optimize
            }}
            className="relative top-96 right-[50%] grid size-full origin-top-left grid-cols-4 gap-8 transform-gpu"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                key={colIndex + "marquee"}
                initial="initial"
                animate="animate"
                variants={{
                  initial: { y: 0 },
                  animate: {
                    y: colIndex % 2 === 0 ? [0, 100, 0] : [0, -100, 0],
                    transition: {
                      duration: colIndex % 2 === 0 ? 20 : 25,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  },
                }}
                className="flex flex-col items-start gap-8"
              >
                <GridLineVertical className="-left-4" offset="80px" />

                {subarray.map((image, imageIndex) => (
                  <div key={imageIndex + "img"} className="relative">
                    <GridLineHorizontal className="-top-4" offset="20px" />

                    <ResponsiveImage
                      src={image}
                      alt={`Featured service ${imageIndex + 1}`}
                      priority={imageIndex === 0}
                      isMobile={isMobile}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({ className, offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "1px",
        "--width": "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px",
        "--color-dark": "rgba(255, 255, 255, 0.2)",
      }}
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};

const GridLineVertical = ({ className, offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "5px",
        "--width": "1px",
        "--fade-stop": "90%",
        "--offset": offset || "150px",
        "--color-dark": "rgba(255, 255, 255, 0.2)",
      }}
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};


const ResponsiveImage = ({ src, alt, priority = false, isMobile }) => {
  const baseUrl = src.split("/upload/")[0];
  const publicId = src.split("/upload/")[1];
  const widths = [320, 480, 768, 970];
  const getSrcSet = () =>
    widths
      .map(
        (w) => `${baseUrl}/upload/f_auto,q_auto,c_fill,w_${w}/${publicId} ${w}w`
      )
      .join(", ");

  const defaultWidth = isMobile ? 480 : 970;
  const defaultHeight = isMobile ? 348 : 700;

  return (
    <img
      src={`${baseUrl}/upload/f_auto,q_auto,c_fill,w_${defaultWidth}/${publicId}`}
      srcSet={getSrcSet()}
      sizes={isMobile ? "100vw" : "33vw"}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchpriority={priority ? "high" : "low"}
      decoding="async"
      width={defaultWidth}
      height={defaultHeight}
      className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 transition-transform duration-300 hover:-translate-y-2"
      style={{
        willChange: "transform",
        contain: "layout",
      }}
    />
  );
};
