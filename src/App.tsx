import './styles/app.scss';
import Header from './components/Header/Header.tsx';
import FiltersAndSorting from './components/FiltersAndSorting/FiltersAndSorting.tsx';
import AllSalads from './components/AllSalads/AllSalads.tsx';

function App() {
  return (
    <>
      <Header />
      <FiltersAndSorting />
      <AllSalads />
    </>
  );
}

export default App;
