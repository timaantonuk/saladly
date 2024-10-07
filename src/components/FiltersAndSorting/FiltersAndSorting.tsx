import './filters-and-sorting.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterByType,
  SaladState,
} from '../../store/slices/saladSlice/saladSlice.ts';
import { useState } from 'react';

function FiltersAndSorting() {
  const dispatch = useDispatch();
  const salads = useSelector((state: SaladState) => state.salad.allSalads);

  const [filters, setFilters] = useState([
    { name: 'All 🥗', selected: false },
    { name: 'Vegetarian 🥦', selected: false },
    { name: 'Meat 🥓', selected: false },
    { name: 'Hot 🌶️', selected: false },
    { name: 'Pasta 🍝', selected: false },
  ]);

  function handleFilterClick(filter, index) {
    setFilters((prevFilters) =>
      prevFilters.map((el, i) => ({
        ...el,
        selected: index === i ? true : false,
      })),
    );

    // console.log(filter.name);
    const filterStr = filter.name.toLowerCase().slice(0, -3);
    console.log(filterStr);

    dispatch(filterByType(filterStr));
  }

  return (
    <nav className="filter-menu">
      <ul className="filter-menu__list">
        {filters.map((filter, index) => (
          <li
            key={filter.name}
            onClick={() => handleFilterClick(filter, index)}
            className={
              filter.selected
                ? 'filter-menu__item filter-menu__item--selected'
                : 'filter-menu__item'
            }
          >
            <button className="filter-menu__button" type="button">
              {filter.name}
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="sorting-button">
        Sort by{' '}
        <select className="sorting-button__sort-type">
          <option value="price-low-first" defaultChecked>
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
