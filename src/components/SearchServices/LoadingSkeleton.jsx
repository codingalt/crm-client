import { Skeleton } from "@nextui-org/react";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="w-full mt-6 md:mt-4">
      <div className="w-full mt-4">
        <div className="flex items-center justify-between w-full  transition-all rounded-lg md:px-2 py-2 mb-2">
          {/* Left Side  */}
          <div className="flex">
            <div className="w-10 h-10 rounded-lg">
              <Skeleton className="w-full h-full rounded-lg" disableAnimation />
            </div>
            <div className="ml-3">
              <Skeleton className="w-36 h-4 rounded-md" disableAnimation />
              <div className="flex items-center mt-2 gap-1 text-gray-400">
                <Skeleton className="w-44 h-3 rounded-md" disableAnimation />
              </div>
            </div>
          </div>
          {/* Right Side  */}
          <div className="text-gray-600 font-medium text-sm md:text-medium md:pr-3">
            <Skeleton className="w-28 h-4 rounded-md" disableAnimation />
          </div>
        </div>

        <div className="flex items-center justify-between w-full  transition-all rounded-lg md:px-2 py-2 mb-2">
          {/* Left Side  */}
          <div className="flex">
            <div className="w-10 h-10 rounded-lg">
              <Skeleton className="w-full h-full rounded-lg" disableAnimation />
            </div>
            <div className="ml-3">
              <Skeleton className="w-36 h-4 rounded-md" disableAnimation />
              <div className="flex items-center mt-2 gap-1 text-gray-400">
                <Skeleton className="w-44 h-3 rounded-md" disableAnimation />
              </div>
            </div>
          </div>
          {/* Right Side  */}
          <div className="text-gray-600 font-medium text-sm md:text-medium md:pr-3">
            <Skeleton className="w-28 h-4 rounded-md" disableAnimation />
          </div>
        </div>

        <div className="flex items-center justify-between w-full  transition-all rounded-lg md:px-2 py-2 mb-2">
          {/* Left Side  */}
          <div className="flex">
            <div className="w-10 h-10 rounded-lg">
              <Skeleton className="w-full h-full rounded-lg" disableAnimation />
            </div>
            <div className="ml-3">
              <Skeleton className="w-36 h-4 rounded-md" disableAnimation />
              <div className="flex items-center mt-2 gap-1 text-gray-400">
                <Skeleton className="w-44 h-3 rounded-md" disableAnimation />
              </div>
            </div>
          </div>
          {/* Right Side  */}
          <div className="text-gray-600 font-medium text-sm md:text-medium md:pr-3">
            <Skeleton className="w-28 h-4 rounded-md" disableAnimation />
          </div>
        </div>

        <div className="flex items-center justify-between w-full  transition-all rounded-lg md:px-2 py-2 mb-2">
          {/* Left Side  */}
          <div className="flex">
            <div className="w-10 h-10 rounded-lg">
              <Skeleton className="w-full h-full rounded-lg" disableAnimation />
            </div>
            <div className="ml-3">
              <Skeleton className="w-36 h-4 rounded-md" disableAnimation />
              <div className="flex items-center mt-2 gap-1 text-gray-400">
                <Skeleton className="w-44 h-3 rounded-md" disableAnimation />
              </div>
            </div>
          </div>
          {/* Right Side  */}
          <div className="text-gray-600 font-medium text-sm md:text-medium md:pr-3">
            <Skeleton className="w-28 h-4 rounded-md" disableAnimation />
          </div>
        </div>

        <div className="flex items-center justify-between w-full  transition-all rounded-lg md:px-2 py-2 mb-2">
          {/* Left Side  */}
          <div className="flex">
            <div className="w-10 h-10 rounded-lg">
              <Skeleton className="w-full h-full rounded-lg" disableAnimation />
            </div>
            <div className="ml-3">
              <Skeleton className="w-36 h-4 rounded-md" disableAnimation />
              <div className="flex items-center mt-2 gap-1 text-gray-400">
                <Skeleton className="w-44 h-3 rounded-md" disableAnimation />
              </div>
            </div>
          </div>
          {/* Right Side  */}
          <div className="text-gray-600 font-medium text-sm md:text-medium md:pr-3">
            <Skeleton className="w-28 h-4 rounded-md" disableAnimation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
