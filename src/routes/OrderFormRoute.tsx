import Header from '../components/layout/Header/Header.tsx';

import Footer from '../components/layout/Footer/Footer.tsx';
import OrderForm from '../components/OrderForm/OrderForm.tsx';

function OrderFormRoute() {
  return (
    <>
      <Header />
      <OrderForm />
      <Footer />
    </>
  );
}

export default OrderFormRoute;
