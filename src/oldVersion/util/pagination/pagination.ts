import { useState } from "react";
import { DietPlan } from "../dietPlans";
import { Recipe } from "../recipes";

function usePagination<Item extends Recipe | DietPlan>(
  data: Item[],
  itemsPerPage: number
) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage: number) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage: number) => Math.max(currentPage - 1, 1));
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;
