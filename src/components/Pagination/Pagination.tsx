import React from 'react';
import './pagination.scss';

function Pagination() {
  return (
    <>
      <nav className="pagination" aria-label="Pagination">
        <ul className="pagination__list">
          <li className="pagination__item">
            <a className="pagination__link" href="#" aria-label="Previous">
              &lt;
            </a>
          </li>
          <li className="pagination__item">
            <a className="pagination__link" href="#">
              1
            </a>
          </li>
          <li className="pagination__item">
            <a className="pagination__link" href="#">
              2
            </a>
          </li>
          <li className="pagination__item">
            <a className="pagination__link" href="#">
              3
            </a>
          </li>
          <li className="pagination__item">
            <a className="pagination__link" href="#" aria-label="Next">
              &gt;
            </a>
          </li>
        </ul>
      </nav>

      <div style={{ width: '100%', height: '80px' }}></div>
    </>
  );
}

export default Pagination;
