import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {ArrowRight2} from "iconsax-react";
import { useState } from "react";

export default function FilterSection({
  icon: Icon,
  title,
  children,
  hasActiveFilters,
  activeCount,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-lg ${
                hasActiveFilters ? "bg-teal-50" : "bg-gray-100"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  hasActiveFilters ? "text-hintPrimary" : "text-gray-700"
                }`}
              />
            </div>
            <div>
              <h3 className=" font-medium text-gray-900">{title}</h3>
              {activeCount > 0 && (
                <p className="text-xs text-hintPrimary">{activeCount} selected</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <div className="w-2 h-2 bg-hintptext-hintPrimary rounded-full" />
            )}
            <ArrowRight2
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 pt-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-up-2 data-[state=open]:slide-down-2 duration-200 ease-in-out">
        <div className="bg-slate-50 border rounded-lg p-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}