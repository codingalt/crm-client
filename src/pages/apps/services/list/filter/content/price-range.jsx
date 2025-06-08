import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DollarCircle } from "iconsax-react";

export default function PriceRangeContent({ filters, updateFilters, onClose }) {
  // Local state to hold pending changes
  const [localFilters, setLocalFilters] = useState({
    priceRange: filters.priceRange,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
  });

  const handleSliderChange = (value) => {
    const newRange = [value[0], value[1]];
    setLocalFilters({
      priceRange: newRange,
      priceMin: value[0].toString(),
      priceMax: value[1].toString(),
    });
  };

  const handleMinChange = (value) => {
    const min = Number.parseInt(value) || 0;
    setLocalFilters({
      ...localFilters,
      priceMin: value,
      priceRange: [min, localFilters.priceRange[1]],
    });
  };

  const handleMaxChange = (value) => {
    const max = Number.parseInt(value) || 500;
    setLocalFilters({
      ...localFilters,
      priceMax: value,
      priceRange: [localFilters.priceRange[0], max],
    });
  };

  const handleQuickSelect = (min, max) => {
    setLocalFilters({
      priceRange: [min, max],
      priceMin: min.toString(),
      priceMax: max.toString(),
    });
  };

  const handleApply = () => {
    updateFilters(localFilters);
    // Close the popover after applying
    if (onClose) {
      onClose();
    }
  };

  const handleClear = () => {
    const clearedFilters = {
      priceRange: [0, 500],
      priceMin: "",
      priceMax: "",
    };
    setLocalFilters(clearedFilters);
    updateFilters(clearedFilters);
  };

  return (
    <div className="space-y-5 max-w-80">
      <div className="space-y-3.5">
        <Slider
          value={localFilters.priceRange}
          onValueChange={handleSliderChange}
          max={500}
          min={0}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>$0</span>
          <span>$500+</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-600">Minimum</Label>
          <div className="relative bg-white">
            <div className="absolute px-2 pr-0 left-3 top-1/2 -translate-y-1/2">
              <DollarCircle className="w-4 h-4 text-gray-400" />
            </div>
            <Input
              type="number"
              placeholder="0"
              className="px-7 pr-0 h-10 text-sm"
              value={localFilters.priceMin}
              onChange={(e) => handleMinChange(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-600">Maximum</Label>
          <div className="relative bg-white">
            <div className="absolute px-2 pr-0 left-3 top-1/2 -translate-y-1/2">
              <DollarCircle className="w-4 h-4 text-gray-400" />
            </div>
            <Input
              type="number"
              placeholder="500"
              className="px-7 pr-0 h-10 text-sm"
              value={localFilters.priceMax}
              onChange={(e) => handleMaxChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-xs font-medium text-gray-600">
          Quick Select
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={
              localFilters.priceRange[0] === 0 &&
              localFilters.priceRange[1] === 50
                ? "default"
                : "outline"
            }
            size="sm"
            className="h-10 text-sm"
            onClick={() => handleQuickSelect(0, 50)}
          >
            Under $50
          </Button>
          <Button
            variant={
              localFilters.priceRange[0] === 50 &&
              localFilters.priceRange[1] === 100
                ? "default"
                : "outline"
            }
            size="sm"
            className="h-10 text-sm"
            onClick={() => handleQuickSelect(50, 100)}
          >
            $50 - $100
          </Button>
          <Button
            variant={
              localFilters.priceRange[0] === 100 &&
              localFilters.priceRange[1] === 200
                ? "default"
                : "outline"
            }
            size="sm"
            className="h-10 text-sm"
            onClick={() => handleQuickSelect(100, 200)}
          >
            $100 - $200
          </Button>
          <Button
            variant={
              localFilters.priceRange[0] === 200 &&
              localFilters.priceRange[1] === 500
                ? "default"
                : "outline"
            }
            size="sm"
            className="h-10 text-sm"
            onClick={() => handleQuickSelect(200, 500)}
          >
            $200+
          </Button>
        </div>
      </div>

      {/* Apply and Clear Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <Button variant="ghost" className="flex-1 h-11" onClick={handleClear}>
          Clear all
        </Button>
        <Button className="flex-1 h-11" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
}
