import { useEffect, useState } from 'react';
import './header.scss';
import logo from '../../../assets/logo.png';
import { IoCartSharp, IoPersonCircleSharp } from 'react-icons/io5';
import { RxDividerVertical } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import MobileMenuModal from '../MobileMenuModal/MobileMenuModal.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { searchByName } from '../../../store/slices/saladSlice/saladSlice.ts';
import { calculateTotal } from '../../../utilFunctions.ts';
import { RootState } from '../../../store/store.ts';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const debouncedSearchValue = useDebounce(searchValue, 500);

  function handleMobileModalOpen() {
    setIsMobileMenuOpen((prevState) => !prevState);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    dispatch(searchByName(searchValue));
  }, [debouncedSearchValue]);

  return (
    <>
      <header className="header" id="page-top">
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
          value={searchValue}
          onChange={(e) => handleInputChange(e)}
        />

        <div className="header__buttons">
          <Link to={userState.email.length > 0 ? '/account' : '/sign-up'}>
            <button className="header__login-button" type="button">
              <span className="header__login-text">Account</span>{' '}
              <RxDividerVertical />
              {userState.avatar ? (
                <img
                  className="header__avatar"
                  src={userState.avatar}
                  alt="user avatar"
                />
              ) : (
                <IoPersonCircleSharp
                  style={{ width: '30px', height: '30px' }}
                />
              )}
            </button>
          </Link>

          <Link to="/cart">
            <button className="header__cart-button" type="button">
              <span className="header__cart-text">
                {calculateTotal(cartItems)}$
              </span>{' '}
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
