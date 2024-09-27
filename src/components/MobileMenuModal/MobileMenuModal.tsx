import React from 'react';
import './mobile-menu-modal.scss';
import { createPortal } from 'react-dom';
import { IoCartSharp, IoPersonCircleSharp } from 'react-icons/io5';

function MobileMenuModal() {
  const modalRoot = document.getElementById('modal-root');
  return createPortal(
    <div className="mobile-menu-modal">
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
    </div>,
    modalRoot,
  );
}

export default MobileMenuModal;
