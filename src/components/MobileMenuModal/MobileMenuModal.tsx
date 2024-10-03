import './mobile-menu-modal.scss';
import { IoCartSharp, IoPersonCircleSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

interface IMobileMenuModalProps {
  isOpen: boolean;
  handleMobileModalOpen: () => void;
}

function MobileMenuModal({
  isOpen,
  handleMobileModalOpen,
}: IMobileMenuModalProps) {
  const navigate = useNavigate();

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
        <Link to="/sign-in">
          <button
            className="mobile-menu-modal__item"
            onClick={handleMobileModalOpen}
          >
            <span className="mobile-menu-modal__span">My Account</span>
            <IoPersonCircleSharp style={{ width: '30px', height: '30px' }} />
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
