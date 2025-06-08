// Initial filter state
export const initialFilterState = {
  sort: "popular",
  priceRange: [0, 500],
  priceMin: "",
  priceMax: "",
  selectedRating: null,
  latitude: null,
  longitude: null,
  country_id: null,
  city_id: null,
  selectedCategory: null,
  selectedDate: undefined,
  timeSlot: undefined,
  search: "",
};

// Sort Options
export const sortOptions = [
  { value: "popular", label: "Most Popular", badge: "Default" },
  { value: "newest", label: "Newest First" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
];

