import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import './firebase/firebase.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  'pk_test_51QBNUsG0d1bAuJaVUPS0XGnNLd8Y01LieXrbjm6e2V56F1SEDBmPeFEzEf5ESDcbBJWBd59fkZwrlUiKO30PolNh00urwGBQH1',
); // Replace with your actual publishable key

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </Elements>
  </StrictMode>,
);
