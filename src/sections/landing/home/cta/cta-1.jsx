import React from "react";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import Cta1Image from "@/assets/images/landing/cta-1.png";
import bgImage from "@/assets/images/landing/cta-1-bg.png";
import ImagePlaceholder from "@/components/ui/imae-placeholder";

const Cta1 = () => {
  return (
    <section className="w-full py-9 md:py-28 md:pt-24 max-w-7xl px-4 md:px-6 mx-auto rounded-2xl">
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="mx-auto bg-cover bg-center bg-no-repeat bg-hintPrimary rounded-2xl overflow-hidden"
      >
        <div className="flex flex-col gap-5 lg:flex-row items-center px-1 py-8 lg:py-0">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 p-6 lg:p-12 lg:py-10 text-white">
            <h1 className="heading-landing max-w-xl !text-white !font-bold mb-10">
              Looking for a Best Service Platform?
            </h1>
            <div className="mb-10 lg:mb-14 flex gap-3">
              <p className="text-sm md:text-lg mb-1 text-[#EAEAEA]">
                Starting at
              </p>
              <p className="text-4xl md:text-5xl font-bold whitespace-nowrap">
                $300{" "}
                <span className="text-sm md:text-xl font-normal text-[#EAEAEA]">
                  /month
                </span>
              </p>
            </div>
            <NavLink
              to="#register"
              className="inline-block bg-white text-hintPrimary font-semibold px-4 md:px-6 py-4 rounded-lg text-lg hover:bg-opacity-90 transition-all"
            >
              <div className="flex items-center capitalize justify-center gap-2.5">
                <span className="text-sm md:text-base">
                  List Your Business for free
                </span>
                <ArrowRight size={22} />
              </div>
            </NavLink>
          </div>

          {/* Right Content - Image Grid */}
          <div className="w-full hidden lg:block relative h-[700px] lg:w-1/2 md:h-[500px]">
            <div className="absolute left-0 right-0 lg:bottom-0 lg:right-0">
              <ImagePlaceholder
                src={Cta1Image}
                alt="Service professionals grid"
                className="object-cover h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta1;
