import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ArrowDown2, Calendar1 } from "iconsax-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import dayjs from "dayjs";
import { timeSlots } from "@/data/projectData";
import { isTimeSlotPassed } from "@/utils/helpers/helpers";

export default function DateTimeContent({ filters, updateFilters, onClose }) {
  const [open, setOpen] = useState(false);

  const handleTimeSlotChange = (timeSlotId) => {
    updateFilters({ timeSlot: timeSlotId });

    if (onClose) {
      onClose();
    }
  };

  const handleDateSelect = (date) => {
    if (date) {
      updateFilters({
        selectedDate: date ? dayjs(date).format("YYYY-MM-DD") : undefined,
      });

      setOpen(false);
      onClose();
    }
  };

  const formatDate = (date) => {
    if (!date) return "Select date";
    return dayjs(date).format("MMM D, YYYY");
  };

  const isToday = (date) => {
    if (!date) return false;
    return date === dayjs().format("YYYY-MM-DD");
  };

  const isTomorrow = (date) => {
    if (!date) return false;
    return date === dayjs().add(1, "day").format("YYYY-MM-DD");
  };

  // Check if a date matches next week (7 days from today)
  const isNextWeek = (date) => {
    if (!date) return false;
    return date === dayjs().add(7, "day").format("YYYY-MM-DD");
  };

  return (
    <div className="space-y-6">
      {/* Single Date Selection */}
      <div className="space-y-3.5">
        <Label className="text-sm font-medium text-gray-900">Date</Label>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="w-full">
            <Button
              variant="outline"
              className={cn(
                "relative flex justify-between items-center rounded-md gap-3.5 pl-4 h-12 md:h-11 w-full text-left"
              )}
            >
              <div className="flex items-center gap-3.5">
                <Calendar1 className="!h-5 !w-5 text-gray-800" />
                <span className="truncate text-gray-700">
                  {formatDate(filters.selectedDate)}
                </span>
              </div>
              <ArrowDown2 className="!h-4 !w-4 text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto md:w-[400px] p-0" align="start">
            <div className="p-5 pb-2 flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  const today = dayjs().format("YYYY-MM-DD");
                  updateFilters({ selectedDate: today });
                  setOpen(false);
                  onClose();
                }}
                variant={isToday(filters.selectedDate) ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-8 text-xs rounded-full",
                  isToday(filters.selectedDate) && "bg-hintPrimary text-white"
                )}
              >
                Today
              </Button>
              <Button
                variant={
                  isTomorrow(filters.selectedDate) ? "default" : "outline"
                }
                size="sm"
                className={cn(
                  "h-8 text-xs rounded-full",
                  isTomorrow(filters.selectedDate) &&
                    "bg-hintPrimary text-white"
                )}
                onClick={() => {
                  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
                  updateFilters({ selectedDate: tomorrow });
                  setOpen(false);
                  onClose();
                }}
              >
                Tomorrow
              </Button>
              <Button
                variant={
                  isNextWeek(filters.selectedDate) ? "default" : "outline"
                }
                size="sm"
                className={cn(
                  "h-8 text-xs rounded-full",
                  isNextWeek(filters.selectedDate) &&
                    "bg-hintPrimary text-white"
                )}
                onClick={() => {
                  const nextWeek = dayjs().add(7, "day").format("YYYY-MM-DD");
                  updateFilters({ selectedDate: nextWeek });
                  setOpen(false);
                  onClose();
                }}
              >
                Next Week
              </Button>
              {filters.selectedDate && (
                <Button
                  onClick={() => updateFilters({ selectedDate: undefined })}
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex h-8 text-xs rounded-full text-gray-500 hover:text-gray-700"
                >
                  Clear
                </Button>
              )}
            </div>
            <CalendarComponent
              mode="single"
              className="pointer-events-auto"
              selected={
                filters.selectedDate
                  ? dayjs(filters.selectedDate).toDate()
                  : undefined
              }
              onSelect={(date) => handleDateSelect(date)}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
              initialFocus
              showOutsideDays={false}
              fixedWeeks
              weekStartsOn={1}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Slots */}
      <div className="">
        <Label className="text-sm mb-2 font-medium text-gray-900">
          Time Slots
        </Label>
        <RadioGroup
          value={filters.timeSlot || ""}
          onValueChange={handleTimeSlotChange}
          className="gap-0 mt-0.5"
        >
          {timeSlots?.map((slot) => {
            const isPassed = isTimeSlotPassed(slot);

            return (
              <label
                key={slot.id}
                htmlFor={slot.id}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors border border-transparent cursor-pointer text-left ${
                  isPassed || !filters?.selectedDate
                    ? "!cursor-not-allowed opacity-60"
                    : "hover:bg-gray-50 hover:border-gray-200"
                }`}
              >
                <RadioGroupItem
                  value={slot.id}
                  id={slot.id}
                  disabled={isPassed || !filters?.selectedDate}
                  className={`w-5 h-5`}
                />
                <div className="flex flex-col items-start">
                  <div
                    className={`text-sm font-medium block ${
                      isPassed || !filters?.selectedDate
                        ? "text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {slot.label}
                    {isPassed && <span className="ml-2 text-xs">(Past)</span>}
                  </div>
                  <p
                    className={`text-xs ${
                      isPassed || !filters?.selectedDate
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {slot.time}
                  </p>
                </div>
              </label>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
