import React from 'react'
import { BarLoader } from "react-spinners";

const BarLoading = () => {
  return (
    <div className="gap-2 flex flex-col items-center justify-center">
      <BarLoader color="#212121" height={2} width={85} />
      <p className="leading-tight text-[#212121] font-normal text-sm">
        Loading...
      </p>
    </div>
  );
}

export default BarLoading