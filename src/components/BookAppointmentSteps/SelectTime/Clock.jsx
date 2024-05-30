import React, { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { pickersLayoutClasses } from "@mui/x-date-pickers/PickersLayout";

const Clock = ({ setSelectedTime }) => {

  const handleAppointmentTime = (time) => {
    setSelectedTime(dayjs(time).format());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["TimePicker", "StaticTimePicker"]}
        sx={{ scrollbarWidth: "none", overflow: "hidden" }}
      >
        <DemoItem label="" sx={{ scrollbarWidth: "none", overflow: "hidden" }}>
          <StaticTimePicker
            orientation="portrait"
            defaultValue={dayjs(new Date())}
            onChange={(e) => handleAppointmentTime(e.$d)}
            slotProps={{
              layout: {
                sx: {
                  [`.${pickersLayoutClasses.actionBar}`]: {
                    display: "none",
                  },

                  [`.css-1rv8zyt-MuiStack-root`]: {
                    scrollbarWidth: "none",
                  },

                  [`.css-7kirvq-MuiTypography-root-MuiPickersToolbarText-root.Mui-selected`]:
                    {
                      backgroundColor: "#01ABAB",
                      color: "#fff",
                      textAlign: "center",
                      padding: "2px 5px",
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },

                  [`.css-7kirvq-MuiTypography-root-MuiPickersToolbarText-root:active`]:
                    {
                      color: "#fff",
                    },

                  [`.css-ihhycx-MuiTimePickerToolbar-amPmSelection .MuiTimePickerToolbar-ampmLabel`]:
                    {
                      borderRadius: "6px",
                    },

                  [`.css-umzx0k-MuiClock-pin`]: {
                    backgroundColor: "#01ABAB",
                  },

                  [`.css-d0vs79-MuiClockPointer-root`]: {
                    backgroundColor: "#01ABAB",
                  },

                  [`.css-f53ilk-MuiClockPointer-thumb`]: {
                    backgroundColor: "#01ABAB",
                    border: "16px solid #01ABAB",
                  },

                  [`.css-12t0dn4-MuiClockPointer-thumb`]: {
                    border: "16px solid #01ABAB",
                  },

                  [`.css-2x8kvt-MuiPickersArrowSwitcher-root-MuiTimeClock-arrowSwitcher`]:
                    {
                      display: "none",
                    },

                  [`.css-13u1oz-MuiButtonBase-root-MuiButton-root-MuiPickersToolbarButton-root:active`]:
                    {
                      color: "#01ABAB",
                      background: "#01ABAB",
                    },
                },
              },
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Clock;
