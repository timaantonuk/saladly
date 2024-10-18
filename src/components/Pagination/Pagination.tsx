import './pagination.scss';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}: PaginationProps) {
  const pageNumbers = [];

  // Вычисляем количество страниц
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Обработчик для изменения страницы
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageNumbers.length) {
      paginate(newPage);
    }
  };

  // console.log(currentPage);

  return (
    <nav className="pagination" aria-label="Pagination">
      <ul className="pagination__list">
        {/* Кнопка для перехода на предыдущую страницу */}
        <li
          className={`pagination__item ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <a href="#" className="pagination__link" aria-label="Previous">
            &lt;
          </a>
        </li>

        {/* Кнопки для каждой страницы */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => handlePageChange(number)}
            className={`pagination__item ${+currentPage === +number ? 'pagination__item pagination__item--active' : ''}`}
          >
            <a className="pagination__link">{number}</a>
          </li>
        ))}

        {/* Кнопка для перехода на следующую страницу */}
        <li
          className={`pagination__item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <a href="#" className="pagination__link" aria-label="Next">
            &gt;
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
