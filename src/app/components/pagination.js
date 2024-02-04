import { useEffect, useState } from "react";

export const Pagination = ({
  users,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) => {
  const [totalPage, setTotalPage] = useState();
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const total = users.length / itemsPerPage;
    if (users.length % itemsPerPage > 0) {
      setTotalPage(Math.floor(total) + 1);
    } else {
      setTotalPage(Math.floor(total));
    }
  }, [users]);

  return (
    <div className="pagination">
      <button
        className="button"
        onClick={handlePrev}
        disabled={currentPage == 0}
      >
        Prev
      </button>
      <button
        className="button"
        onClick={handleNext}
        disabled={currentPage == totalPage}
      >
        Next
      </button>
    </div>
  );
};
