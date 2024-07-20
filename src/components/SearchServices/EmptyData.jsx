import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import React from "react";

const EmptyData = ({ debouncedSearchText, setSearchText }) => {
  return (
    <div className="w-full px-2 md:px-0 py-12 md:py-6 flex items-center justify-center flex-col">
      <AvatarGroup isBordered>
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          size="md"
        />
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          size="md"
        />
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          size="md"
        />
      </AvatarGroup>
      <p className="text-medium text-gray-700 font-medium mt-3">
        No Results found
      </p>
      <p className="text-default-500 font-normal text-xs md:text-sm max-w-sm text-center mt-1">
        Sorry, we couldn't find any results with the name{" "}
        <br className="hidden md:block" /> <span>"{debouncedSearchText}"</span>.
        Please try searching something else.
      </p>
      <Button
        variant="ghost"
        className="mt-1 text-green-700 font-medium border-none"
        size="md"
        onClick={() => setSearchText("")}
      >
        Clear Search
      </Button>
    </div>
  );
};

export default EmptyData;
