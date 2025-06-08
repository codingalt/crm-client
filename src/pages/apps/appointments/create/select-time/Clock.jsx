import React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { pickersLayoutClasses } from "@mui/x-date-pickers/PickersLayout";

const Clock = ({ selectedTime, setSelectedTime }) => {
  const handleAppointmentTime = (time) => {
    setSelectedTime(time);
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
            value={selectedTime}
            onChange={(e) => handleAppointmentTime(e)}
            slotProps={{
              layout: {
                sx: {
                  [`.${pickersLayoutClasses.actionBar}`]: {
                    display: "none",
                  },

                  [`.MuiStack-root`]: {
                    scrollbarWidth: "none",
                  },

                  [`.css-7kirvq-MuiTypography-root-MuiPickersToolbarText-root.Mui-selected`]:
                    {
                      backgroundColor: "#01ABAB !important",
                      color: "#fff !important",
                      textAlign: "center",
                      padding: "2px 5px",
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },

                  [`.MuiTypography-root-MuiPickersToolbarText-root:active`]: {
                    color: "#fff !important",
                  },

                  [`.MuiTimePickerToolbar-amPmSelection .MuiTimePickerToolbar-ampmLabel`]:
                    {
                      borderRadius: "6px",
                    },

                  [`.MuiClock-pin`]: {
                    backgroundColor: "#01ABAB !important",
                  },

                  [`.MuiClockPointer-root`]: {
                    backgroundColor: "#01ABAB !important",
                  },

                  [`.MuiClockPointer-thumb`]: {
                    backgroundColor: "#01ABAB !important",
                    border: "16px solid #01ABAB !important",
                  },

                  [`.MuiClockPointer-thumb`]: {
                    border: "16px solid #01ABAB !important",
                  },

                  [`.MuiPickersArrowSwitcher-root-MuiTimeClock-arrowSwitcher`]:
                    {
                      display: "none",
                    },

                  [`.MuiButtonBase-root-MuiButton-root-MuiPickersToolbarButton-root:active`]:
                    {
                      color: "#01ABAB !important",
                      background: "#01ABAB !important",
                    },

                  [`.MuiClockPointer-root`]: {
                    backgroundColor: "#01ABAB !important",
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
