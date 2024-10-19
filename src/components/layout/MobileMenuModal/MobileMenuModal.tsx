import './mobile-menu-modal.scss';
import { IoCartSharp, IoPersonCircleSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store.ts';

interface IMobileMenuModalProps {
  isOpen: boolean;
  handleMobileModalOpen: () => void;
}

function MobileMenuModal({
  isOpen,
  handleMobileModalOpen,
}: IMobileMenuModalProps) {
  const navigate = useNavigate();
  const userState = useSelector((state: RootState) => state.user);

  function handleGoToCart() {
    handleMobileModalOpen(); // Закрываем модальное окно
    navigate('/cart'); // Перенаправляем пользователя на страницу корзины
  }

  return (
    <div
      className={
        isOpen
          ? 'mobile-menu-modal mobile-menu-modal--open'
          : 'mobile-menu-modal'
      }
    >
      <ul className="mobile-menu-modal__list">
        <Link to={userState.email.length > 0 ? '/account' : '/sign-up'}>
          <button
            className="mobile-menu-modal__item"
            onClick={handleMobileModalOpen}
          >
            <span className="mobile-menu-modal__span">My Account</span>
            {userState.avatar ? (
              <img
                className="header__avatar"
                src={userState.avatar}
                alt="user avatar"
              />
            ) : (
              <IoPersonCircleSharp style={{ width: '30px', height: '30px' }} />
            )}
          </button>
        </Link>

        <button className="mobile-menu-modal__item" onClick={handleGoToCart}>
          <span className="mobile-menu-modal__span">Go to Cart</span>
          <IoCartSharp style={{ width: '30px', height: '30px' }} />
        </button>
      </ul>
    </div>
  );
}

export default MobileMenuModal;
