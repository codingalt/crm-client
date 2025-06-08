import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

// Forcefully override the positioning strategy
const forceBottomStyles = {
  position: "absolute",
  top: "100%",
  left: "0",
  marginTop: "5px",
  transform: "none !important",
  zIndex: 9999,
};

const PopoverContent = React.forwardRef(
  (
    {
      className,
      align = "center",
      side = "bottom",
      sideOffset = 4,
      avoidCollisions = false,
      forceBottom = false,
      ...props
    },
    ref
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        side={side}
        sideOffset={sideOffset}
        avoidCollisions={avoidCollisions}
        style={forceBottom ? forceBottomStyles : undefined}
        className={cn(
          "z-[9999] w-[var(--radix-popover-trigger-width)] rounded-md border bg-white p-4 text-gray-800 shadow-lg outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
);

PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
