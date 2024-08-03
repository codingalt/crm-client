import { Button, Image } from "@nextui-org/react";
import React from "react";
import { useTranslation } from "react-i18next";
import empty from "../../assets/emptyData.png";

const EmptyData = ({
  debouncedSearchText,
  setSearchText,
  setShowEmptyData,
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full px-2 md:px-0 pt-16 pb-12 md:pb-4 md:pt-10 flex items-center justify-center flex-col">
      <div className="w-14">
        <Image src={empty} radius="none" />
      </div>

      <p className="text-medium text-gray-700 font-medium mt-2.5">
        {t("noResultsFound")}
      </p>
      <p className="text-default-500 font-normal text-xs md:text-sm max-w-sm text-center mt-1">
        {t("sorryCouldNotFindText")} <br className="hidden md:block" />{" "}
        <span>"{debouncedSearchText}"</span>. {t("trySearching")}
      </p>
      <Button
        variant="ghost"
        className="mt-1 text-green-600 font-medium border-none"
        size="md"
        onClick={() => {
          setSearchText("");
          setShowEmptyData(false);
        }}
      >
        {t("clearSearch")}
      </Button>
    </div>
  );
};

export default EmptyData;
