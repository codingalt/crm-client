import React from "react";
import { Tabs, Tab, Chip, Button } from "@nextui-org/react";
import { MdUpcoming } from "react-icons/md";
import { RiChatHistoryFill } from "react-icons/ri";
import FutureQueues from "./FutureQueues";
import HistoryAppointments from "./HistoryAppointments";
import { useGetMyBookingsQuery } from "../../services/api/businessProfileApi/businessProfileApi";
import { Empty } from "antd";
import ClipSpinner from "../Loader/ClipSpinner";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";

const AppointmentTabs = ({ setRatingData, setShow }) => {
  const { t } = useTranslation();
  const { data, isLoading, error, refetch } = useGetMyBookingsQuery();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        size="lg"
        keyboardActivation="manual"
        classNames={{
          tabList:
            "gap-9 md:gap-14 w-full max-w-xs md:max-w-md relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#01ABAB]",
          tab: "max-w-[50%] px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#01ABAB]",
        }}
      >
        <Tab
          key="future"
          title={
            <div className="flex items-center space-x-2 text-sm md:text-medium">
              <MdUpcoming className="text-[18px] md:text-[23px]" />
              <span className="capitalize">
                {t("active")}{" "}
                <span className="hidden sm:inline-block">{t("queues")}</span>{" "}
              </span>
              {data && (
                <Chip size="sm" variant="faded">
                  {parseInt(data?.active?.length) +
                    parseInt(data?.upComing?.length)}
                </Chip>
              )}
            </div>
          }
        >
          {!isLoading &&
            data?.active?.length === 0 &&
            data?.upComing?.length === 0 && (
              <div className="w-full h-40 flex justify-center max-w-md mt-36 md:mt-10">
                <Empty description={<span>{t("noActiveAppointments")}</span>} />
              </div>
            )}

          {!isLoading && !error && (
            <FutureQueues active={data?.active} upComing={data?.upComing} />
          )}
        </Tab>
        <Tab
          key="history"
          title={
            <div className="flex items-center space-x-2 text-sm md:text-medium">
              <RiChatHistoryFill className="text-[18px] md:text-[23px]" />
              <span className="capitalize">
                <span className="hidden sm:inline-block">{t("queues")}</span>{" "}
                <span>{t("history")}</span>
              </span>
              {data && (
                <Chip size="sm" variant="faded">
                  {parseInt(data?.completed?.length)}
                </Chip>
              )}
            </div>
          }
        >
          {!isLoading && !error && (
            <HistoryAppointments
              data={data?.completed}
              setShow={setShow}
              setRatingData={setRatingData}
            />
          )}
          {!isLoading && data?.completed?.length === 0 && (
            <div className="w-full flex justify-center max-w-md mt-0">
              <Empty
                description={<span>{t("noCompletedAppointments")}</span>}
              />
            </div>
          )}
        </Tab>
      </Tabs>

      {isLoading && (
        <div className="w-full h-40 flex justify-center max-w-md mt-28">
          <ClipSpinner size={isSmallDevice ? 35 : 43} />
        </div>
      )}

      {/* Show Error If data fails to load  */}
      {!isLoading && error && (
        <div className="px-4 w-full max-w-md mt-28 md:mt-24 py-2 flex flex-col gap-2 items-center">
          <p className="font-medium text-[15px] md:text-lg text-[#01abab]">
            Let's try this again.
          </p>
          <span className="px-6 text-xs text-default-600 text-center max-w-xs">
            Oops! Something went wrong. We couldn't fetch the data.
          </span>
          <Button
            size="sm"
            radius="sm"
            className="mt-2 px-6 text-white bg-[#01abab]"
            onClick={refetch}
          >
            Try again
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppointmentTabs;
