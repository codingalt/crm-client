import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { sortOptions } from "../data";
import { Badge } from "@/components/ui/badge";

export default function SortContent({ filters, updateFilters, onClose }) {
  return (
    <div>
      <RadioGroup
        value={filters.sort}
        onValueChange={(value) => {
          updateFilters({ sort: value });
          if (onClose) onClose();
        }}
        className="gap-0"
      >
        {sortOptions?.map(({ value, label, badge }) => (
          <div
            key={value}
            onClick={() => {
              updateFilters({ sort: value });
              if (onClose) onClose();
            }}
            className="flex items-center cursor-pointer space-x-3 p-3.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RadioGroupItem value={value} id={value} className="w-5 h-5" />
            <Label
              htmlFor={value}
              className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
            >
              {label}
            </Label>
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
