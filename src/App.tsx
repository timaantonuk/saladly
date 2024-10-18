import './styles/app.scss';
import Header from './components/layout/Header/Header.tsx';
import FiltersAndSorting from './components/FiltersAndSorting/FiltersAndSorting.tsx';
import AllSalads from './components/AllSalads/AllSalads.tsx';

import Footer from './components/layout/Footer/Footer.tsx';

function App() {
  return (
    <>
      <Header />
      <FiltersAndSorting />
      <AllSalads />
      <Footer />
    </>
  );
}

export default App;
