import './salad-card.scss';
import { FaPlusCircle } from 'react-icons/fa';

import { ISalad } from '../AllSalads/AllSalads.tsx';

function SaladCard({
  name,
  imageUrl,
  description,
  price,
  calories,
  protein,
  carbs,
  fat,
  weight,
}: ISalad) {
  return (
    <article className="salad-card">
      <div className="salad-card__info">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="salad-card__image"
        />
        <h3 className="salad-card__heading">{name}</h3>
        <p className="salad-card__description">{description}</p>
      </div>

      <div className="salad-card__nutrition-info">
        <p className="salad-card__kcal-info">
          🟠 {weight}g ⚡ {calories}kcal
        </p>
        <p className="salad-card__pcf-info">
          Protein: {protein}g | Carbs: {carbs}g | Fat: {fat}g
        </p>
      </div>

      <div className="salad-card__buttons">
        <button className="salad-card__button">Medium Size</button>
        <button className="salad-card__button">XL Size</button>
      </div>

      <div className="salad-card__price-info">
        <h3 className="salad-card__price">${price}</h3>
        <button className="salad-card__price-button">
          <FaPlusCircle />
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  );
}

export default SaladCard;
