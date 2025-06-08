import React from "react";
import HeroSection from "@/sections/landing/home/hero";
import BenefitsSection from "@/sections/landing/home/benefits-section";
import ServicesCarouselSection from "@/sections/landing/home/services";
import Cta2 from "@/sections/landing/home/cta/cta-2";
import DownloadAppSection from "@/sections/landing/home/app-download";
import TestimonialsSection from "@/sections/landing/home/testimonial";
import Cta1 from "@/sections/landing/home/cta/cta-1";
import ServiceCategorySection from "@/sections/landing/home/service-category";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <HeroSection />
      <BenefitsSection />
      <ServicesCarouselSection />
      <Cta1 />
      <ServiceCategorySection />
      <TestimonialsSection />
      <DownloadAppSection />
      <Cta2 />
    </div>
  );
};

export default HomePage;
