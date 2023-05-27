import React from 'react';

interface MovieListPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
}

export const MovieListPagination: React.FC<MovieListPaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => {
          const isSelectedPage = pageNumber === currentPage;
          const buttonClassName = isSelectedPage
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-gray-700';

          return (
            <button
              key={pageNumber}
              className={`mx-1 px-3 py-2 rounded-lg ${buttonClassName}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        },
      )}
    </div>
  );
};
