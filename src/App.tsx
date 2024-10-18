import './styles/app.scss';
import Header from './components/layout/Header/Header.tsx';
import FiltersAndSorting from './components/FiltersAndSorting/FiltersAndSorting.tsx';
import AllSalads from './components/AllSalads/AllSalads.tsx';
import Footer from './components/layout/Footer/Footer.tsx';
import { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader.tsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      // Simulating a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false);
    };

    fetchData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <FiltersAndSorting />
      <AllSalads />
      <Footer />
    </>
  );
}

export default App;
