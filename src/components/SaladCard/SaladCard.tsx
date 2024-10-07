import './salad-card.scss';
import { FaPlusCircle } from 'react-icons/fa';

import { Salad } from '../../types.ts';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice/cartSlice.ts';
import { Bounce, toast } from 'react-toastify';

function SaladCard({
  name,
  imageUrl,
  description,
  price,
  priceXl,
  calories,
  protein,
  carbs,
  fat,
  weight,
}: Salad) {
  const [size, setSize] = useState('medium');
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(
      addItem({
        name: name,
        price: size === 'xl' ? priceXl : price,
        portion: size === 'xl' ? 'big' : 'medium',
        imageUrl: imageUrl,
        quantity: 1,
      }),
    );
    toast.info('🥗 Item added to cart', {
      position: 'top-center',
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Bounce,
    });
  }

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
        <button
          className="salad-card__button"
          onClick={() => setSize('medium')}
        >
          Medium Size
        </button>
        <button
          className="salad-card__button salad-card__button--active"
          onClick={() => setSize('xl')}
        >
          XL Size
        </button>
      </div>

      <div className="salad-card__price-info">
        <h3 className="salad-card__price">
          ${size === 'medium' ? price : priceXl}
        </h3>
        <button className="salad-card__price-button" onClick={handleAddToCart}>
          <FaPlusCircle />
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  );
}

export default SaladCard;
