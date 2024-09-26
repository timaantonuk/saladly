import React from 'react';
import './filters-and-sorting.scss'
import {IoChevronDownSharp} from "react-icons/io5";


function FiltersAndSorting() {
  return (
      <nav className='filter-menu'>
        <ul className='filter-menu__list'>
          <li className='filter-menu__item filter-menu__item--selected'>All 🥗</li>
          <li className='filter-menu__item '>Vegetarian 🥦</li>
          <li className='filter-menu__item '>Meat 🥓</li>
          <li className='filter-menu__item '>Hot 🌶️</li>
          <li className='filter-menu__item '>Pasta 🍝</li>
        </ul>

          <button type='button' className='sorting-button'>
            <IoChevronDownSharp/>  Sort by <span className='sorting-button__sort-type'>popularity</span>
          </button>
      </nav>
  );
}

export default FiltersAndSorting;