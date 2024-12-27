/**
 * Pagination Component
 * 
 * This component is responsible for rendering the pagination controls for navigating 
 * between pages of a dataset. It includes buttons for navigating to the previous and 
 * next pages, a display of the current page and the total number of pages, and a dropdown 
 * to select the number of rows to be displayed per page.
 *
 * Props:
 * - totalRows (number): The total number of rows in the dataset, used to calculate 
 *   the total number of pages.
 *
 * Redux state:
 * - currentPage (number): The current page number, selected from the global Redux store.
 * - rowsPerPage (number): The number of rows to display per page, selected from the 
 *   global Redux store.
 *
 * Redux actions:
 * - setRowsPerPage (function): Dispatches an action to update the number of rows per 
 *   page in the global state.
 * - setCurrentPage (function): Dispatches an action to update the current page number 
 *   in the global state.
 *
 * Event Handlers:
 * - handleRowsPerPageChange (function): Handles changes in the "Rows per page" dropdown 
 *   and updates the state with the new value.
 * - handlePageChange (function): Handles the page change when the "Prev" or "Next" button 
 *   is clicked and updates the current page.
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRowsPerPage,
  setCurrentPage,
  dashboardSelector,
} from "../redux/dashboardSlice";

const Pagination = ({ totalRows }) => {
  const { currentPage, rowsPerPage } = useSelector(dashboardSelector);
  const dispatch = useDispatch();

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleRowsPerPageChange = (e) => {
    dispatch(setRowsPerPage(parseInt(e.target.value)));
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="p-2 text-blue-500 disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="p-2 text-blue-500 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div>
        <label>Rows per page:</label>

        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="ml-2 p-2 border rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
