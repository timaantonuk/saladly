import './all-salads.scss';
import SaladCard from '../SaladCard/SaladCard.tsx';
import { useEffect, useState } from 'react';
import client from '../../sanityClient.ts';

export interface ISalad {
  name: string;
  description: string;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  weight: string;
  imageUrl: string;
}

function AllSalads() {
  const [salads, setSalads] = useState<ISalad[]>([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "salad"]{
          name,
          description,
          price,
          calories,
          protein,
          carbs,
          fat,
          weight,
          "imageUrl": image.asset->url
        }`,
      )
      .then((data) => setSalads(data))
      .catch(console.error);
  }, []);

  console.log(salads);

  return (
    <main className="salads-menu">
      <h2 className="salads-menu__title">All Salads</h2>

      <ul className="salads-menu__list">
        {salads.map((salad) => (
          <SaladCard key={salad.name} {...salad} />
        ))}
      </ul>
    </main>
  );
}

export default AllSalads;
