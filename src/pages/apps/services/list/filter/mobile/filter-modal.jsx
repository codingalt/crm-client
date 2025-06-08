import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";
import {
  ArrangeVertical,
  Calendar1,
  DollarCircle,
  Location,
  Star1,
  Tag,
} from "iconsax-react";
import CategoryContent from "../content/category";
import PriceRangeContent from "../content/price-range";
import DateTimeContent from "../content/date-time";
import RatingContent from "../content/rating";
import LocationContent from "../content/location";
import FilterSection from ".";
import { useState } from "react";
import SortContent from "../content/sort";

export default function MobileFiltersModal({
  filters,
  updateFilters,
  clearAllFilters,
  activeFilterCount,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyFilters = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 bg-[#ffffff] border border-gray-200 text-[#4c515c] hover:bg-gray-50"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 rounded-full text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[89vh] !rounded-t-2xl p-0 border-0"
        hideCloseButton
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 py-4 border-b !rounded-t-[40px] bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount} active
                  </Badge>
                )}
              </SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <X className="!w-6 !h-6 text-gray-700" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto bg-white">
            <FilterSection
              icon={ArrangeVertical}
              title="Sort Options"
              hasActiveFilters={filters.sort !== "recommended"}
              activeCount={filters.sort !== "recommended" && 1}
            >
              <SortContent filters={filters} updateFilters={updateFilters} />
            </FilterSection>

            <FilterSection
              icon={Tag}
              title="Category"
              hasActiveFilters={filters.selectedCategory}
              activeCount={filters.selectedCategory !== null}
            >
              <CategoryContent
                filters={filters}
                updateFilters={updateFilters}
              />
            </FilterSection>

            <FilterSection
              icon={Calendar1}
              title="Date & Time"
              hasActiveFilters={
                filters.selectedDate !== undefined ||
                filters.timeSlot !== undefined
              }
              activeCount={filters.selectedDate || filters.timeSlot ? 1 : 0}
            >
              <DateTimeContent
                filters={filters}
                updateFilters={updateFilters}
              />
            </FilterSection>

            <FilterSection
              icon={Location}
              title="Location"
              hasActiveFilters={
                filters.country ||
                filters.city ||
                filters.latitude ||
                filters.longitude
              }
              activeCount={
                (filters.country ||
                  filters.city ||
                  filters.latitude ||
                  filters.longitude) &&
                1
              }
            >
              <LocationContent
                filters={filters}
                updateFilters={updateFilters}
              />
            </FilterSection>

            <FilterSection
              icon={DollarCircle}
              title="Price Range"
              hasActiveFilters={
                filters.priceRange[0] !== 0 || filters.priceRange[1] !== 500
              }
            >
              <div className="py-2">
                <PriceRangeContent
                  filters={filters}
                  updateFilters={updateFilters}
                />
              </div>
            </FilterSection>

            <FilterSection
              icon={Star1}
              title="Rating"
              hasActiveFilters={filters.selectedRating !== null}
              activeCount={filters.selectedRating !== null ? 1 : 0}
            >
              <RatingContent filters={filters} updateFilters={updateFilters} />
            </FilterSection>
          </div>

          <div className="border-t p-6 py-5 bg-white">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12"
                onClick={clearAllFilters}
              >
                Clear All
              </Button>
              <Button className="flex-1 h-12" onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
