import './cart-item.scss';
import { IoCloseSharp } from 'react-icons/io5';
import { ICartItem } from '../../types.ts';
import { useDispatch } from 'react-redux';
import {
  decrement,
  deleteItem,
  increment,
} from '../../store/slices/cartSlice/cartSlice.ts';

function CartItem({ name, price, imageUrl, quantity, portion }: ICartItem) {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <img src={imageUrl} alt="Caesar salad" className="cart-item__image" />

      <div className="cart-item__info">
        <h4 className="cart-item__info__heading">{name}</h4>
        <p className="cart-item__info__size">
          {portion === 'big' ? 'XL Size' : 'Medium Size'}
        </p>
        <p className="cart-item__info__pricing">{price}$</p>

        <div className="cart-item__info__controls">
          <button
            className="cart-item__info__controls__button cart-item__info__controls__button--minus "
            onClick={() => dispatch(decrement({ name }))}
          >
            -
          </button>
          <span className="cart-item__info__controls__amount">{quantity}</span>
          <button
            className="cart-item__info__controls__button"
            onClick={() => dispatch(increment({ name }))}
          >
            +
          </button>
        </div>
      </div>

      {/*<div className="cart-item__prices">*/}
      {/*  <p className="cart-item__prices__price">*/}
      {/*    Price for item -{' '}*/}
      {/*    <span className="cart-item__prices__price__span">{price}$</span>*/}
      {/*  </p>*/}
      {/*</div>*/}

      <button
        className="cart-item__close-btn"
        onClick={() => dispatch(deleteItem({ name }))}
      >
        <IoCloseSharp style={{ width: '20px', height: '20px' }} />
      </button>
    </article>
  );
}

export default CartItem;
