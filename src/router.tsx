import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import CartRoute from './routes/CartRoute.tsx';

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/cart', element: <CartRoute /> },
]);
