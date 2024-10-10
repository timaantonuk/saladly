import ErrorPage from '../components/errors/ErrorPage/ErrorPage.tsx';
import Header from '../components/layout/Header/Header.tsx';
import Footer from '../components/layout/Footer/Footer.tsx';

export default function ErrorPageRoute() {
  return (
    <>
      <Header />
      <ErrorPage />
      <Footer />
    </>
  );
}
