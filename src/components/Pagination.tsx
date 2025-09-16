import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          disabled={i === currentPage}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            backgroundColor: i === currentPage ? "#333" : "#fff",
            color: i === currentPage ? "#fff" : "#333",
            border: "1px solid #333",
            cursor: i === currentPage ? "default" : "pointer",
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ marginRight: "10px", padding: "5px 10px" }}
      >
        Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ marginLeft: "10px", padding: "5px 10px" }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
