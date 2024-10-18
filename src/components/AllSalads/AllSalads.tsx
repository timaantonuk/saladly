import './all-salads.scss';
import SaladCard from '../SaladCard/SaladCard.tsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchSalads } from '../../store/slices/saladSlice/saladActions.ts';
import { RootState, useAppDispatch } from '../../store/store.ts';
import Pagination from '../Pagination/Pagination.tsx';
import CatalogMagic from '../ContentLoader/CatalogMagic'; // Импортируем лоадер

function AllSalads() {
  const dispatch = useAppDispatch();
  const salads = useSelector((state: RootState) => state.salad.allSalads);
  const [loading, setLoading] = useState(true); // состояние загрузки

  useEffect(() => {
    dispatch(fetchSalads()).then(() => {
      // Добавляем искусственную задержку в 1 секунду
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, [dispatch]);

  return (
    <main className="salads-menu">
      <h2 className="salads-menu__title">All Salads</h2>

      {loading ? (
        <CatalogMagic /> // Показываем лоадер, пока данные загружаются
      ) : (
        <>
          <ul className="salads-menu__list">
            {salads.map((salad) => (
              <SaladCard key={salad.name} {...salad} />
            ))}
          </ul>
          <Pagination />
        </>
      )}
    </main>
  );
}

export default AllSalads;
