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
