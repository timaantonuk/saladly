import './styles/app.scss';
import Header from './components/Header/Header.tsx';
import FiltersAndSorting from './components/FiltersAndSorting/FiltersAndSorting.tsx';
import AllSalads from './components/AllSalads/AllSalads.tsx';
import Pagination from './components/Pagination/Pagination.tsx';
import Footer from './components/Footer/Footer.tsx';

function App() {
  return (
    <>
      <Header />
      <FiltersAndSorting />
      <AllSalads />
      <Pagination />
      <Footer />
    </>
  );
}

export default App;
