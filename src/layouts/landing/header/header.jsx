import React, { useEffect, useRef, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import Logo from "@/components/common/logo/Logo";
import { navData } from "@/data/projectData";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import UserMenu from "./UserMenu";
import useUserData from "@/hooks/useUserData";
import { Skeleton } from "@/components/ui/skeleton";
import { removeToken } from "@/utils/helpers/tokenUtils";

const Header = () => {
  const headerRef = useRef();
  const isInView = useInView(headerRef, { once: true, amount: 0.3 });
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("/");
  const [manualNavigation, setManualNavigation] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // User Data
  const { user, isLoading } = useUserData();

  // Get current pathname and hash
  const pathName = window.location.pathname;
  const hash = window.location.hash;

  // Set active item based on URL changes
  useEffect(() => {
    // When URL changes, update the active item immediately
    if (hash) {
      // If there's a hash, set the active item to the matching route with hash
      const matchedItem = navData.find((item) => {
        if (item.link.includes("#")) {
          // For hash links, check if the current hash matches
          return pathName + hash === item.link || hash === item.link;
        }
        return false;
      });

      if (matchedItem) {
        setActiveItem(matchedItem.link);
      } else if (pathName === "/") {
        setActiveItem("/");
      }
    } else {
      // No hash, just match pathname
      setActiveItem(pathName);
    }

    // Set manual navigation flag
    setManualNavigation(true);

    // Reset the manual navigation flag after a delay
    const timer = setTimeout(() => {
      setManualNavigation(false);
    }, 1000); // 1 second delay to prevent scroll detection from overriding

    return () => clearTimeout(timer);
  }, [pathName, hash]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      // Store current scroll position for mobile menu positioning
      setScrollPosition(window.scrollY);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastScrollY > 0) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          ticking = false;
        });

        ticking = true;
      }

      // Only check section visibility if not in manual navigation mode
      if (!manualNavigation) {
        checkSectionVisibility();
      }
    };

    // Function to check which section is currently in view
    const checkSectionVisibility = () => {
      if (pathName === "/" && !hash) {
        // Only change to home link if we're near the top of the page
        if (window.scrollY < 300) {
          setActiveItem("/");
          return;
        }
      }

      // Check which section is in view
      navData.forEach((item) => {
        if (item.link.includes("#") && item.link !== "#") {
          const sectionId = item.link.split("#")[1];
          const section = document.getElementById(sectionId);

          if (section) {
            const rect = section.getBoundingClientRect();
            const isVisible =
              rect.top <= 150 && // Adjust this threshold as needed
              rect.bottom >= 150;

            if (isVisible) {
              setActiveItem(item.link);
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [manualNavigation, pathName, hash]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore the scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isMenuOpen]);

  // Handle navigation click
  const handleNavClick = (itemLink) => {
    setActiveItem(itemLink);
    setManualNavigation(true);
    setIsMenuOpen(false);

    // Reset the manual navigation flag after a delay
    setTimeout(() => {
      setManualNavigation(false);
    }, 1000);
  };

  // Handle logout
  const handleLogout = () => {
    removeToken();
    window.location.reload(false);
  };

  // Render mobile menu toggle or avatar
  const renderMobileMenuToggle = () => {
    if (isLoading) {
      // Show skeleton while loading
      return (
        <div className="md:hidden">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      );
    }

    if (user) {
      // User is logged in - show avatar with UserMenu
      return (
        <div className="md:hidden">
          <UserMenu
            user={user}
            onLogout={handleLogout}
            placement="bottom"
            isMobile={true}
          />
        </div>
      );
    }

    // Default: show menu toggle button
    return (
      <button
        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-[#E5DEFF]/50 focus:outline-none z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>
    );
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        className={cn(
          // Enhanced styling for scrolled state
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow"
            : pathName === "/"
            ? "bg-white/90 backdrop-blur-md shadow-none "
            : "bg-white/90 backdrop-blur-md shadow-none ",
          "sticky top-0 z-50 transition-all duration-300 ease-in-out w-full"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <div className="container mx-auto px-6 lg:px-4 xl:px-16 py-1 lg:py-3.5">
          <div className="flex items-center justify-between">
            {/* Logo  */}
            <div className="flex-shrink-0">
              <Logo
                width={isSmallDevice ? 24 : 36}
                height={isSmallDevice ? 24 : 36}
              />
            </div>

            {/* Nav Links - Fixed by centering and using flex-1 with proper justification */}
            <div className="hidden md:flex flex-1 justify-center">
              <nav className="flex gap-8 xl:gap-9 items-center">
                {navData?.map((item, index) => {
                  const isActive = activeItem === item?.link;

                  return (
                    <Link
                      key={index}
                      smooth
                      aria-current={isActive ? "page" : undefined}
                      to={item?.link}
                      onClick={() => handleNavClick(item.link)}
                      className={cn(
                        "group relative text-center md:text-sm lg:text-base xl:text-base font-normal transition-colors text-[#6A6A6A] hover:text-hintPrimary",
                        isActive && "font-medium text-hintPrimary"
                      )}
                    >
                      {item?.title}
                      <span
                        className={cn(
                          "absolute left-0 -bottom-0.5 h-[2px] bg-hintPrimary transition-all duration-300 ease-in-out",
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        )}
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Auth Buttons or User Avatar */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              {isLoading ? (
                // Show skeleton while loading
                <AvatarSkeleton />
              ) : user ? (
                // User is logged in - show UserMenu component
                <UserMenu
                  user={user}
                  onLogout={handleLogout}
                  placement="bottom-end"
                />
              ) : (
                // User is not logged in - show login and register buttons
                <>
                  <Link aria-current="page" to="/login">
                    <Button
                      className="px-7 bg-transparent border-hintPrimary text-hintPrimary hover:text-hintPrimary"
                      variant="outline"
                      size="xl"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link aria-current="page" to="/signup">
                    <Button size="xl" className="px-6">
                      Register Service
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button or User Avatar */}
            {renderMobileMenuToggle()}
          </div>
        </div>
      </motion.header>

      {/* Mobile navigation overlay - moved outside header completely */}
      <div
        className={cn(
          "fixed inset-0 bg-white/95 backdrop-blur-sm z-40 md:hidden flex flex-col",
          "transform transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full pointer-events-none"
        )}
      >
        {/* Sticky header within mobile menu */}
        <div className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md p-6 pb-4 flex justify-between items-center">
          <div className="flex-shrink-0">
            <Logo
              width={isSmallDevice ? 24 : 36}
              height={isSmallDevice ? 24 : 36}
            />
          </div>

          <button
            className="p-2 rounded-lg text-gray-700 hover:bg-[#E5DEFF]/50 focus:outline-none z-50"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={26} />
          </button>
        </div>

        <div className="flex-1 pt-4 pb-6 px-6 overflow-y-auto">
          <nav className="flex flex-col space-y-6 pt-3 relative h-full">
            {navData?.map((item, index) => {
              const isActive = activeItem === item?.link;

              return (
                <Link
                  key={index}
                  smooth
                  onClick={() => handleNavClick(item.link)}
                  to={item?.link}
                  className={cn(
                    isActive && "!text-hintPrimary",
                    "group relative px-4 py-3 pb-2 text-center text-lg font-medium rounded-lg text-[#212121] hover:text-hintPrimary",
                    "transform transition-all duration-300 ease-in-out",
                    isMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  )}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 75}ms` : "0ms",
                  }}
                >
                  {item?.title}
                  <span
                    className={cn(
                      "absolute left-0 right-0 mx-auto -bottom-0.5 h-[2px] bg-hintPrimary transition-all duration-300 ease-in-out",
                      isActive ? "w-[30%]" : "w-0 group-hover:w-[30%]"
                    )}
                  />
                </Link>
              );
            })}

            {/* Show login button only if user is not logged in */}
            {!isLoading && !user && (
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/login"
                className={cn(
                  "mt-6",
                  "transform transition-all duration-300 ease-in-out",
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
                style={{
                  transitionDelay: isMenuOpen
                    ? `${navData.length * 75}ms`
                    : "0ms",
                }}
              >
                <Button size="lg" className="w-full">
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;

const AvatarSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="md:h-11 md:w-11 h-8 w-8 rounded-full" />
      <Skeleton className="h-4 w-24 hidden lg:block" />
    </div>
  );
};
