import React from 'react';
import './cart-item.scss';
import { IoCloseSharp } from 'react-icons/io5';

function CartItem() {
  return (
    <article className="cart-item">
      <img
        src="https://salateira.ua/wp-content/uploads/2020/02/caesar.png"
        alt="Caesar salad"
        className="cart-item__image"
      />

      <div className="cart-item__info">
        <h4 className="cart-item__info__heading">Ceasar Salad</h4>
        <p className="cart-item__info__size">Big portion</p>

        <div className="cart-item__info__controls">
          <button className="cart-item__info__controls__button cart-item__info__controls__button--minus ">
            -
          </button>
          <span className="cart-item__info__controls__amount">1</span>
          <button className="cart-item__info__controls__button">+</button>
        </div>
      </div>

      <div className="cart-item__prices">
        <p className="cart-item__prices__price">
          Price for item -{' '}
          <span className="cart-item__prices__price__span">66.99$</span>
        </p>
      </div>

      <button className="cart-item__close-btn">
        <IoCloseSharp style={{ width: '20px', height: '20px' }} />
      </button>
    </article>
  );
}

export default CartItem;
