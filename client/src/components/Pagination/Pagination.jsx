// Pagination.js
import React from 'react';
import './Pagination.scss';

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="pagination">
      <button onClick={onPrevPage} disabled={currentPage === 1}>Previous</button>
      <span> {currentPage} / {totalPages}</span>
      <button onClick={onNextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

export default Pagination;
