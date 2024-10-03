import './cart.scss';
import CartItem from '../CartItem/CartItem.tsx';

function Cart() {
  return (
    <>
      <section className="cart">
        {/*<h2 className="cart__title">Your Cart</h2>*/}

        <div className="cart__wrapper">
          <div className="cart__items-container">
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <aside className="cart__recipt">
            <div className="cart__recipt__header">
              <span className="cart__recipt__header__decorative"></span>
              <span>ВАШ ЧЕК</span>
              <span className="cart__recipt__header__decorative"></span>
            </div>

            <div className="cart__recipt__body">
              <div className="cart__recipt__body__item">
                <span className="cart__recipt__body__item-name">
                  Миу-пицца с ветчиной и сюрприз
                </span>
                <span className="cart__recipt__body__item-qty">X 1</span>
                <span className="cart__recipt__body__item-price">260.99$</span>
              </div>
              <div className="cart__recipt__body__item">
                <span className="cart__recipt__body__item-name">Карбонара</span>
                <span className="cart__recipt__body__item-qty">X 1</span>
                <span className="cart__recipt__body__item-price">55.00$</span>
              </div>
              <div className="cart__recipt__body__item">
                <span className="cart__recipt__body__item-name">
                  Диабло 🌶🌶
                </span>
                <span className="cart__recipt__body__item-qty">X 1</span>
                <span className="cart__recipt__body__item-price">33.00$</span>
              </div>
              <div className="cart__recipt__body__item">
                <span className="cart__recipt__body__item-name">Песто</span>
                <span className="cart__recipt__body__item-qty">X 1</span>
                <span className="cart__recipt__body__item-price">999.00$</span>
              </div>
            </div>

            <div className="cart__recipt__footer">
              <span className="cart__recipt__footer-label">Всего</span>
              <span className="cart__recipt__footer-total">950.00$</span>
            </div>

            <button className="cart__recipt__button">Place Order</button>
          </aside>
        </div>
      </section>
    </>
  );
}

export default Cart;
