import React from 'react'
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { MdHistory } from "react-icons/md";
import { MdUpcoming } from "react-icons/md";
import { RiFileHistoryFill } from "react-icons/ri";
import { RiChatHistoryFill } from "react-icons/ri";
import FutureQueues from './FutureQueues';
import HistoryAppointments from './HistoryAppointments';
import { useGetMyBookingsQuery } from '../../services/api/businessProfileApi/businessProfileApi';
import { Empty } from 'antd';
import ClipSpinner from '../Loader/ClipSpinner';

const AppointmentTabs = () => {
    const { data,isLoading } = useGetMyBookingsQuery();

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
            "gap-14 w-full max-w-md relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#01ABAB]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#01ABAB]",
        }}
      >
        <Tab
          key="future"
          title={
            <div className="flex items-center space-x-2">
              <MdUpcoming fontSize={23} />
              <span>Active Queues</span>
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
            data?.active.length === 0 &&
            data?.upComing.length === 0 && (
              <div className="w-full h-40 flex justify-center max-w-md mt-10">
                <Empty description={<span>No active appointments.</span>} />
              </div>
            )}

          <FutureQueues active={data?.active} upComing={data?.upComing} />

          {isLoading && (
            <div className="w-full h-40 flex justify-center max-w-md mt-14">
              <ClipSpinner />
            </div>
          )}
        </Tab>
        <Tab
          key="history"
          title={
            <div className="flex items-center space-x-2">
              <RiChatHistoryFill fontSize={23} />
              <span>Queues History</span>
              {data && (
                <Chip size="sm" variant="faded">
                  {parseInt(data?.completed?.length)}
                </Chip>
              )}
            </div>
          }
        >
          <HistoryAppointments data={data?.completed} />
          {!isLoading && data?.completed.length === 0 && (
            <div className="w-full h-40 flex justify-center max-w-md mt-10">
              <Empty description={<span>No completed appointments.</span>} />
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}

export default AppointmentTabs