import React from "react";
import Logo from "../logo/Logo";

const HintLoading = ({ fixed }) => {
  return fixed ? (
    <div className="w-full fixed scrollbar-hide left-0 right-0 top-0 bottom-0 bg-white overflow-hidden h-screen z-[9999] hidden items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-3.5 -mt-16">
        <Logo width={35} />
        <div className="w-5 h-5 border-[3px] border-hintPrimary border-b-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  ) : (
    <div className="w-full overflow-hidden h-[calc(100vh-150px)] z-50 flex items-center justify-center">
      <div className="w-6 h-6 border-[3px] border-hintPrimary border-b-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default HintLoading;
