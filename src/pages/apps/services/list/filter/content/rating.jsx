import { Star1 } from "iconsax-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function RatingContent({ filters, updateFilters, onClose }) {
  const handleRatingChange = (value) => {
    const rating = parseInt(value);
    updateFilters({ selectedRating: rating });

    // Auto-close popover after selection
    if (onClose) {
      onClose();
    }
  };

  const handleDivClick = (rating) => {
    handleRatingChange(rating.toString());
  };

  return (
    <div>
      <RadioGroup
        value={filters.selectedRating?.toString() || ""}
        onValueChange={handleRatingChange}
        className="gap-0"
      >
        {[5, 4, 3, 2, 1].map((rating) => (
          <div
            key={rating}
            className="flex items-center space-x-3 p-3.5 py-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleDivClick(rating)}
          >
            <RadioGroupItem
              value={rating.toString()}
              id={`rating-${rating}`}
              className="w-5 h-5 shrink-0 pointer-events-none space-y-0"
            />
            <Label
              htmlFor={`rating-${rating}`}
              className="flex items-center justify-between gap-3 w-full cursor-pointer pointer-events-none"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star1
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  {Array.from({ length: 5 - rating }).map((_, i) => (
                    <Star1 key={i} className="w-4 h-4 text-gray-300" />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700"> & up</span>
              </div>
              <span className="text-xs text-gray-500 ml-3">(1,234)</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
