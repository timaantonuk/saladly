import './all-salads.scss';
import SaladCard from '../SaladCard/SaladCard.tsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchSalads } from '../../store/slices/saladSlice/saladActions.ts';
import { RootState, useAppDispatch } from '../../store/store.ts'; // Import Axios

function AllSalads() {
  const salads = useSelector((state: RootState) => state.salad.allSalads);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSalads());
  }, [dispatch]);

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
