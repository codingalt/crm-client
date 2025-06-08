import React from "react";
import { BarLoader } from "react-spinners";

const DataLoading = () => {
  return (
    <div className="w-full overflow-hidden h-[calc(100vh-200px)] z-50 flex items-center justify-center">
      <div className="gap-2 flex flex-col items-center justify-center">
        <BarLoader color="#212121" height={2} width={85} />
        <p className="leading-tight text-[#212121] font-normal text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default DataLoading;
