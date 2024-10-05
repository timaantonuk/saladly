import './filters-and-sorting.scss';

function FiltersAndSorting() {
  return (
    <nav className="filter-menu">
      <ul className="filter-menu__list">
        <li className="filter-menu__item filter-menu__item--selected">
          All 🥗
        </li>
        <li className="filter-menu__item ">Vegetarian 🥦</li>
        <li className="filter-menu__item ">Meat 🥓</li>
        <li className="filter-menu__item ">Hot 🌶️</li>
        <li className="filter-menu__item ">Pasta 🍝</li>
      </ul>

      <button type="button" className="sorting-button">
        Sort by{' '}
        <select className="sorting-button__sort-type">
          <option value="price-low-first" selected>
            price (low to high)
          </option>
          <option value="price-high-first">price (high to low)</option>
          <option value="popularity-high-first">
            popularity (high to low)
          </option>
          <option value="popularity-low-first">popularity (low to high)</option>
          <option value="alphabetical">alphabetical</option>
        </select>
      </button>
    </nav>
  );
}

export default FiltersAndSorting;
