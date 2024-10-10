import './filters-and-sorting.scss';
import { useDispatch } from 'react-redux';
import {
  filterByType,
  sortByType,
} from '../../store/slices/saladSlice/saladSlice.ts';
import { useEffect, useState } from 'react';

interface IFilter {
  name: string;
  selected: boolean;
  filterKey: string;
}

function FiltersAndSorting() {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState([
    { name: 'All 🥗', selected: true, filterKey: 'all' },
    { name: 'Vegetarian 🥦', selected: false, filterKey: 'vegetarian' },
    { name: 'Meat 🥓', selected: false, filterKey: 'meat' },
    { name: 'Hot 🌶️', selected: false, filterKey: 'hot' },
    { name: 'Pasta 🍝', selected: false, filterKey: 'pasta' },
  ]);

  const [selectedOption, setSelectedOption] = useState('');

  function handleFilterClick(filter: IFilter, index: number) {
    setFilters((prevFilters) =>
      prevFilters.map((el, i) => ({
        ...el,
        selected: index === i,
      })),
    );

    dispatch(filterByType(filter.filterKey));
  }

  function handleSort(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(event.target.value);
  }

  useEffect(() => {
    dispatch(sortByType(selectedOption));
  }, [selectedOption]);

  // console.log(selectedOption);

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
            <button
              className={
                filter.selected
                  ? 'filter-menu__button filter-menu__btn--selected'
                  : 'filter-menu__button'
              }
              type="button"
            >
              {filter.name}
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="sorting-button">
        Sort by{' '}
        <select
          className="sorting-button__sort-type"
          value={selectedOption}
          onChange={handleSort}
        >
          <option value="price-low-first">price (low to high)</option>
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
