import './styles/app.scss';
import Header from './components/Header/Header.tsx';
import FiltersAndSorting from './components/FiltersAndSorting/FiltersAndSorting.tsx';
import AllSalads from './components/AllSalads/AllSalads.tsx';
import Pagination from './components/Pagination/Pagination.tsx';
import MobileMenuModal from './components/MobileMenuModal/MobileMenuModal.tsx';
import { useState } from 'react';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleMobileModalOpen() {
    setIsMobileMenuOpen((prevState) => !prevState);
  }

  return (
    <>
      <MobileMenuModal isOpen={isMobileMenuOpen} />
      {/*<MobileModalWrapper />*/}
      <Header
        handleMobileModalOpen={handleMobileModalOpen}
        isOpen={isMobileMenuOpen}
      />
      <FiltersAndSorting />
      <AllSalads />
      <Pagination />
    </>
  );
}

export default App;
