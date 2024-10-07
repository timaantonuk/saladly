import './cart-item.scss';
import { IoCloseSharp } from 'react-icons/io5';
import { ICartItem } from '../../types.ts';

function CartItem({ name, price, imageUrl, quantity, portion }: ICartItem) {
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
          <button className="cart-item__info__controls__button cart-item__info__controls__button--minus ">
            -
          </button>
          <span className="cart-item__info__controls__amount">{quantity}</span>
          <button className="cart-item__info__controls__button">+</button>
        </div>
      </div>

      <div className="cart-item__prices">
        <p className="cart-item__prices__price">
          Price for item -{' '}
          <span className="cart-item__prices__price__span">{price}$</span>
        </p>
      </div>

      <button className="cart-item__close-btn">
        <IoCloseSharp style={{ width: '20px', height: '20px' }} />
      </button>
    </article>
  );
}

export default CartItem;
