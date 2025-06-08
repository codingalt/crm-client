import React from 'react'
import cta2Image from '@/assets/images/landing/cta-2.jpg'
import { Button } from '@/components/ui/button';

const Cta2 = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[#0A3230] bg-opacity-75 z-0">
        <img
          src={cta2Image}
          alt="Office meeting background"
          className="w-full h-full object-cover mix-blend-overlay opacity-50"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-24 text-white">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-6xl font-bold mb-5 md:mb-6">
            How Can We Assist You?
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl text-[#FDFDFD]">
            Our experts are here to assist you with any questions about booking
            or the parking process—feel free to reach out!
          </p>
          <Button className="py-6 px-8 rounded-md">Contact Us Now</Button>
        </div>
      </div>
    </div>
  );
}

export default Cta2