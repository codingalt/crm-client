import React from "react";
import { Button } from "../ui/button";
import ImagePlaceholder from "../ui/imae-placeholder";
import empty from "@/assets/emptyData.png";

const FetchDataError = ({ refetch, isLoading }) => {
  return (
    <div className="px-4 mx-auto flex flex-col gap-2 items-center">
      <div className="w-14">
        <ImagePlaceholder width="100%" src={empty} alt="Empty" />
      </div>
      <p className="font-medium text-[17px] text-hintPrimary">
        Let's try that again.
      </p>
      <span className="px-6 text-xs text-default-600 text-center max-w-xs">
        Oops! Something went wrong. We couldn't fetch the data.
      </span>
      {refetch && (
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          size="sm"
          radius="sm"
          className="mt-2 px-6"
          onClick={refetch}
        >
          Try again
        </Button>
      )}
    </div>
  );
};

export default FetchDataError;
