import { useState } from 'react';

const usePagination = (initialState = { page: 1, perPage: 10 }) => {
  const [pagination, setPagination] = useState({
    page: initialState.page,
    perPage: initialState.perPage,
    totalItems: 0,
    lastPage: 1
  });

  const updatePagination = (response) => {
    if (!response) return;

    setPagination((prev) => ({
      ...prev,
      totalItems: response.total || 0,
      lastPage: response.last_page || 1
    }));
  };

  return {
    pagination,
    setPagination,
    updatePagination,
    handlePageChange: (newPage) => {
      setPagination((prev) => ({ ...prev, page: newPage }));
    },
    handlePerPageChange: (newPerPage) => {
      setPagination((prev) => ({ ...prev, perPage: newPerPage, page: 1 }));
    }
  };
};

export default usePagination;
