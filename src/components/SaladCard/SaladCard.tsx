import React from 'react';
import './salad-card.scss';
import { FaPlusCircle } from 'react-icons/fa';

function SaladCard() {
  return (
    <article className="salad-card">
      <div className="salad-card__info">
        <img
          src="https://salateira.ua/wp-content/uploads/2020/02/caesar.png"
          alt="Caesar salad"
          className="salad-card__image"
        />
        <h3 className="salad-card__heading">Salad Name</h3>
        <p className="salad-card__description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
          excepturi iste voluptatem.
        </p>
      </div>

      <div className="salad-card__nutrition-info">
        <p className="salad-card__kcal-info">🟠 430g ⚡ 1120kcal</p>
        <p className="salad-card__pcf-info">
          Protein: 10g | Carbs: 10g | Fat: 10g
        </p>
      </div>

      <div className="salad-card__buttons">
        <button className="salad-card__button">Medium Size</button>
        <button className="salad-card__button">XL Size</button>
      </div>

      <div className="salad-card__price-info">
        <h3 className="salad-card__price">$59.99</h3>
        <button className="salad-card__price-button">
          <FaPlusCircle />
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  );
}

export default SaladCard;
