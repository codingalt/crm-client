import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months:
          "w-full flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 w-full",
        caption: "flex justify-between items-center w-full px-0 py-2 relative",
        caption_label: "text-base font-medium text-center flex-1",
        nav: "flex absolute w-full justify-between left-0 px-2",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 bg-transparent p-0 hover:opacity-100 border-none"
        ),
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse",
        head_row: "flex w-full",
        head_cell:
          "text-muted-foreground rounded-md w-10 font-normal text-sm text-center flex-1",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative flex items-center justify-center mx-auto flex-1",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 md:w-10 md:h-10 p-0 hover:text-hintPrimary font-normal rounded-full mx-auto"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "!bg-hintPrimary !text-white hover:bg-hintSecondary focus:bg-hintPrimary focus:text-white",
        day_today: "bg-hintSecondary !text-hintPrimary border font-medium",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-30",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: (props) => <ChevronLeft className="h-6 w-6" {...props} />,
        IconRight: (props) => <ChevronRight className="h-6 w-6" {...props} />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
