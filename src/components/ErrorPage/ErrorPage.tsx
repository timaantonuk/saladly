import './error-page.scss';
import { useRouteError } from 'react-router-dom';
import { BiSolidError } from 'react-icons/bi';
import { FaSadTear } from 'react-icons/fa';

function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error);

  return (
    <div id="error-page" className="error-page">
      <h1 className="error-page__title"> Oops!</h1>
      <p className="error-page__desc">
        <FaSadTear /> Sorry, an unexpected error has occurred. <BiSolidError />
      </p>
      <p className="error-page__error-text">
        <i>404, {error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
