import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import CartRoute from './routes/CartRoute.tsx';
import ErrorPageRoute from './routes/ErrorPageRoute.tsx';
import SignUpFormRoute from './routes/SignUpFormRoute.tsx';

export const router = createBrowserRouter([
  { path: '/', element: <App />, errorElement: <ErrorPageRoute /> },
  { path: '/cart', element: <CartRoute /> },
  { path: '/signup', element: <SignUpFormRoute /> },
]);
