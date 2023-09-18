import { useState } from 'react';

// ==============================|| CARD - PAGINATION ||============================== //

export default function usePagination(length: number, itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxPage = Math.ceil(length / itemsPerPage);

  function next() {
    setCurrentPage((currentPage: number) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage: number) => Math.max(currentPage - 1, 1));
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentPage, maxPage };
}
