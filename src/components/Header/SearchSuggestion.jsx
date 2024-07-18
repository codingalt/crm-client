import React from "react";

const SearchSuggestion = ({ show }) => {
  return (
    <div
      className={`bg-white absolute left-0 right-0 top-full rounded-xl rounded-t-none transition-opacity duration-300 ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="w-full px-4 py-6 border rounded-xl rounded-t-none"></div>
    </div>
  );
};

export default SearchSuggestion;
