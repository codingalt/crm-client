import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import React from "react";
import { useTranslation } from "react-i18next";

const EmptyData = ({ debouncedSearchText, setSearchText }) => {
  const { t } = useTranslation();

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
        {t("noResultsFound")}
      </p>
      <p className="text-default-500 font-normal text-xs md:text-sm max-w-sm text-center mt-1">
        {t("sorryCouldNotFindText")} <br className="hidden md:block" />{" "}
        <span>"{debouncedSearchText}"</span>. {t("trySearching")}
      </p>
      <Button
        variant="ghost"
        className="mt-1 text-green-700 font-medium border-none"
        size="md"
        onClick={() => setSearchText("")}
      >
        {t("clearSearch")}
      </Button>
    </div>
  );
};

export default EmptyData;
