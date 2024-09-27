import './styles/app.scss';
import Header from './components/Header/Header.tsx';
import FiltersAndSorting from './components/FiltersAndSorting/FiltersAndSorting.tsx';
import AllSalads from './components/AllSalads/AllSalads.tsx';
import Pagination from './components/Pagination/Pagination.tsx';
import MobileMenuModal from './components/MobileMenuModal/MobileMenuModal.tsx';
import MobileModalWrapper from './components/MobileModalWrapper/MobileModalWrapper.tsx';

function App() {
  return (
    <>
      <MobileModalWrapper />
      <Header />
      <FiltersAndSorting />
      <AllSalads />
      <Pagination />
    </>
  );
}

export default App;
