import React, { useState } from 'react';
import './header.scss';
import logo from '../../assets/logo.png';
import {
  IoCartSharp,
  IoClose,
  IoMenu,
  IoPersonCircleSharp,
} from 'react-icons/io5';
import { RxDividerVertical } from 'react-icons/rx';
import MobileMenuModal from '../MobileMenuModal/MobileMenuModal.tsx';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleMobileMenuOpen() {
    setIsMobileMenuOpen((prevMenuOpen) => !prevMenuOpen);
  }

  return (
    <>
      <header className="header">
        <div className="header__controls">
          <a className="header__logo" href="#">
            <img className="header__logo-img" src={logo} alt="Saladly logo" />
          </a>
          <div className="header__text-content">
            <a className="header__title-link">
              <h1 className="header__title">Saladly</h1>
            </a>
          </div>

          <button
            onClick={handleMobileMenuOpen}
            className="header__mobile-menu"
          >
            {isMobileMenuOpen ? (
              <IoClose className="header__mobile-burger" />
            ) : (
              <IoMenu className="header__mobile-burger" />
            )}
          </button>
        </div>

        <input
          className="header__search-input"
          type="text"
          placeholder="🔍  Search for a salad..."
        />

        <div className="header__buttons">
          <button className="header__login-button" type="button">
            {' '}
            <span className="header__login-text">Account</span>{' '}
            <RxDividerVertical />{' '}
            <IoPersonCircleSharp style={{ width: '30px', height: '30px' }} />
          </button>
          <button className="header__cart-button" type="button">
            <span className="header__cart-text">100$</span>{' '}
            <RxDividerVertical />
            <IoCartSharp style={{ width: '30px', height: '30px' }} />
          </button>
        </div>
      </header>
      {isMobileMenuOpen && <MobileMenuModal />}
    </>
  );
}

export default Header;
