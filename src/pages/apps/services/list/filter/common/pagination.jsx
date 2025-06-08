import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ServicesPagination = ({ pagination }) => {
  const { currentPage, lastPage, totalItems, perPage, setPage, setPerPage } =
    pagination;

  // Don't render pagination if there's only one page or no items
  if (lastPage <= 1 || totalItems === 0) {
    return null;
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (lastPage <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis logic
      if (currentPage <= 3) {
        // Show first few pages
        pages.push(1, 2, 3, 4, "...", lastPage);
      } else if (currentPage >= lastPage - 2) {
        // Show last few pages
        pages.push(
          1,
          "...",
          lastPage - 3,
          lastPage - 2,
          lastPage - 1,
          lastPage
        );
      } else {
        // Show current page with context
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          lastPage
        );
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < lastPage) {
      setPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= lastPage) {
      setPage(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Page size selector */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Show:</span>
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>per page</span>
      </div>

      {/* Pagination info */}
      <div className="text-sm text-gray-600">
        Showing {Math.min((currentPage - 1) * perPage + 1, totalItems)} to{" "}
        {Math.min(currentPage * perPage, totalItems)} of {totalItems} results
      </div>

      {/* Pagination controls */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={
                currentPage <= 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => handlePageClick(page)}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={
                currentPage >= lastPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ServicesPagination;
