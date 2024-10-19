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
  const [currentPage, setCurrentPage] = useState(1); // текущее состояние страницы
  const itemsPerPage = 6; // количество салатов на страницу

  useEffect(() => {
    // Fetch salads and update state
    dispatch(fetchSalads()).then(() => {
      // Добавляем искусственную задержку в 1 секунду
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, [dispatch]);

  useEffect(() => {
    // Сброс на первую страницу при изменении фильтра (изменении salads)
    setCurrentPage(1);
  }, [salads]); // Отслеживаем изменения отфильтрованных салатов

  // Рассчитываем индексы для отображаемых салатов
  const indexOfLastSalad = currentPage * itemsPerPage;
  const indexOfFirstSalad = indexOfLastSalad - itemsPerPage;
  const currentSalads = salads.slice(indexOfFirstSalad, indexOfLastSalad); // отображаем текущие салаты

  // Функция для смены страницы
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <main className="salads-menu">
      <h2 className="salads-menu__title">All Salads</h2>

      {loading ? (
        <CatalogMagic /> // Показываем лоадер, пока данные загружаются
      ) : (
        <>
          <ul className="salads-menu__list">
            {currentSalads.length > 0 ? (
              currentSalads.map((salad) => (
                <SaladCard key={salad.name} {...salad} />
              ))
            ) : (
              <p className="salads-menu__semi">No salads match your filter.</p>
            )}
          </ul>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={salads.length} // Отфильтрованные салаты
            paginate={paginate}
            currentPage={currentPage} // Передаём текущую страницу
          />
        </>
      )}
    </main>
  );
}

export default AllSalads;
