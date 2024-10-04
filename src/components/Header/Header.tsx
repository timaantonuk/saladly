import { useState } from 'react';
import './header.scss';
import logo from '../../assets/logo.png';
import { IoCartSharp, IoPersonCircleSharp } from 'react-icons/io5';
import { RxDividerVertical } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import MobileMenuModal from '../MobileMenuModal/MobileMenuModal.tsx';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleMobileModalOpen() {
    setIsMobileMenuOpen((prevState) => !prevState);
  }

  // console.log(isMobileMenuOpen);

  return (
    <>
      <header className="header">
        <div className="header__controls">
          <Link to="/">
            <img className="header__logo-img" src={logo} alt="Saladly logo" />
          </Link>

          <Link to="/">
            <div className="header__text-content">
              <h1 className="header__title">Saladly</h1>
            </div>
          </Link>

          <button
            onClick={handleMobileModalOpen}
            className="header__mobile-menu"
          >
            <div
              className="header__mobile-burger"
              onClick={() => console.log(isMobileMenuOpen)}
            >
              <div
                className={
                  isMobileMenuOpen
                    ? 'header__arrow header__arrow--rotate-right'
                    : 'header__arrow'
                }
              ></div>
              <div
                className={
                  isMobileMenuOpen
                    ? 'header__arrow header__arrow--rotate-left'
                    : 'header__arrow'
                }
              ></div>
            </div>
          </button>
        </div>

        <input
          className="header__search-input"
          type="text"
          placeholder="🔍  Search for a salad..."
        />

        <div className="header__buttons">
          <Link to="/sign-in">
            <button className="header__login-button" type="button">
              <span className="header__login-text">Account</span>{' '}
              <RxDividerVertical />{' '}
              <IoPersonCircleSharp style={{ width: '30px', height: '30px' }} />
            </button>
          </Link>

          <Link to="/cart">
            <button className="header__cart-button" type="button">
              <span className="header__cart-text">100$</span>{' '}
              <RxDividerVertical />
              <IoCartSharp style={{ width: '30px', height: '30px' }} />
            </button>
          </Link>
        </div>
      </header>

      <MobileMenuModal
        isOpen={isMobileMenuOpen}
        handleMobileModalOpen={handleMobileModalOpen}
      />
    </>
  );
}

export default Header;
