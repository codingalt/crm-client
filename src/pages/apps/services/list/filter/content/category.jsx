import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import BarLoading from "@/components/common/loaders/BarLoading";

export default function CategoryContent({ filters, updateFilters, onClose,data,loadingCategories }) {
  const [searchValue, setSearchValue] = useState("");
  const handleCategoryChange = (value) => {
    updateFilters({ selectedCategory: value });
    if (onClose) onClose();
  };

  const filteredCategories = useMemo(() => {
    const normalizedSearch = searchValue.toLowerCase();
    return data?.categories?.filter((category) =>
      category?.name?.toLowerCase().includes(normalizedSearch)
    );
  }, [searchValue, data]);
  
  return (
    <div className="space-y-4 md:w-72">
      <div className="relative bg-white">
        <div className="absolute px-2 pr-0 left-3 top-1/2 -translate-y-1/2">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        <Input
          placeholder="Search category..."
          className="px-7 pr-0 h-10 text-sm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.trimStart())}
        />
      </div>

      <div className="max-h-64 overflow-y-auto">
        <RadioGroup
          value={filters.selectedCategory || ""}
          onValueChange={handleCategoryChange}
          className="space-y-1"
        >
          {loadingCategories ? (
            <div className="flex justify-center pt-5 py-4 text-sm text-gray-600">
              <BarLoading />
            </div>
          ) : !filteredCategories || filteredCategories?.length === 0 ? (
            <div className="flex justify-center py-2 text-sm text-gray-600">
              <p>No category found.</p>
            </div>
          ) : (
            filteredCategories?.map((category) => (
              <div
                key={category.id}
                onClick={() => {
                  updateFilters({ selectedCategory: category.id });
                  if (onClose) onClose();
                }}
                className="flex items-center cursor-pointer space-x-3 p-3.5 rounded-lg hover:bg-gray-50 transition-colors min-h-[48px]"
              >
                <RadioGroupItem
                  value={category.id}
                  id={category.id}
                  className="w-5 h-5"
                />
                <Label
                  htmlFor={category.id}
                  className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                >
                  {category.name}
                </Label>
              </div>
            ))
          )}
        </RadioGroup>
      </div>
    </div>
  );
}
