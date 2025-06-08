import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDown2 } from "iconsax-react";

const FilterButton = ({ icon: Icon, label, children, hasActiveFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonContent = (
    <Button
      variant="outline"
      className={`flex items-center gap-2 px-3 py-2 h-12 bg-[#ffffff] border border-gray-200 text-[#24262b] hover:bg-gray-50 min-w-0 flex-shrink-0 relative ${
        hasActiveFilters ? "border-hintPrimary bg-teal-50" : ""
      }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="text-sm truncate font-medium">{label}</span>
      <ArrowDown2 className="w-4 h-4 flex-shrink-0" />
    </Button>
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{buttonContent}</PopoverTrigger>
      <PopoverContent
        className="w-auto min-w-64 max-w-full p-4 py-3"
        align="start"
        sideOffset={8}
      >
        {typeof children === "function"
          ? children(() => setIsOpen(false))
          : children}
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;
