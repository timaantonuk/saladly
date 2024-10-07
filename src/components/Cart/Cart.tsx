import './cart.scss';
import CartItem from '../CartItem/CartItem.tsx';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store.ts';
import { calculateTotal, calculateItem } from '../../utilFunctions.ts';

function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  return (
    <>
      <section className="cart">
        {/*<h2 className="cart__title">Your Cart</h2>*/}

        <div className="cart__wrapper">
          <div className="cart__items-container">
            {cartItems.map((item) => (
              <CartItem key={item.name} {...item} />
            ))}
          </div>
          <aside className="cart__recipt">
            <div className="cart__recipt__header">
              <span className="cart__recipt__header__decorative"></span>
              <span>ВАШ ЧЕК</span>
              <span className="cart__recipt__header__decorative"></span>
            </div>

            <div className="cart__recipt__body">
              {cartItems.map((item) => (
                <div key={item.name} className="cart__recipt__body__item">
                  <span className="cart__recipt__body__item-name">
                    {item.name}
                  </span>
                  <span className="cart__recipt__body__item-qty">
                    X {item.quantity}
                  </span>
                  <span className="cart__recipt__body__item-price">
                    {calculateItem(item.price, item.quantity)} $
                  </span>
                </div>
              ))}
            </div>

            <div className="cart__recipt__footer">
              <span className="cart__recipt__footer-label">Total</span>
              <span className="cart__recipt__footer-total">
                {calculateTotal(cartItems)} $
              </span>
            </div>

            <button className="cart__recipt__button">Place Order</button>
          </aside>
        </div>
      </section>
    </>
  );
}

export default Cart;
