import './cart.scss';
import CartItem from '../CartItem/CartItem.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { calculateTotal, calculateItem } from '../../utilFunctions.ts';
import { FaCartPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const navigate = useNavigate();

  function handleOrderClick() {
    navigate('/order');
  }

  return (
    <>
      <section className="cart">
        {/*<h2 className="cart__title">Your Cart</h2>*/}

        <div className="cart__wrapper">
          <div className="cart__items-container">
            {cartItems.length > 0 ? (
              cartItems.map((item) => <CartItem key={item.name} {...item} />)
            ) : (
              <div className="cart__empty">
                <button className="cart__cart-icon">
                  <FaCartPlus
                    style={{
                      height: '200px',
                      width: '200px',
                      color: '#21332d',
                    }}
                  />
                </button>
                <p className="cart__warning">
                  No items. Add at least one item to cart.
                </p>
              </div>
            )}
          </div>
          <aside className="cart__recipt">
            <div className="cart__recipt__header">
              <span className="cart__recipt__header__decorative"></span>
              <span>YOUR CHECK</span>
              <span className="cart__recipt__header__decorative"></span>
            </div>

            <div className="cart__recipt__body">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
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
                ))
              ) : (
                <p className="cart__recipt__no-items">
                  Add at least one item to cart.
                </p>
              )}
            </div>

            <div className="cart__recipt__footer">
              <span className="cart__recipt__footer-label">Total</span>
              <span className="cart__recipt__footer-total">
                {calculateTotal(cartItems)} $
              </span>
            </div>

            <button className="cart__recipt__button" onClick={handleOrderClick}>
              Place Order
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}

export default Cart;
