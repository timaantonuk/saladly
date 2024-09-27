import React from 'react';
import './mobile-menu-modal.scss';
import { IoCartSharp, IoPersonCircleSharp } from 'react-icons/io5';

function MobileMenuModal({ isOpen }) {
  return (
    <div
      className={
        isOpen
          ? 'mobile-menu-modal mobile-menu-modal--open'
          : 'mobile-menu-modal'
      }
    >
      <ul className="mobile-menu-modal__list">
        <li className="mobile-menu-modal__item">
          <span className="mobile-menu-modal__span">My Account</span>
          <IoPersonCircleSharp style={{ width: '30px', height: '30px' }} />
        </li>
        <li className="mobile-menu-modal__item">
          <span className="mobile-menu-modal__span">Go to Cart</span>{' '}
          <IoCartSharp style={{ width: '30px', height: '30px' }} />
        </li>
      </ul>
    </div>
  );
}

export default MobileMenuModal;
