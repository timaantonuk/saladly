import './sign-in-form.scss';
import formLogo from '../../assets/footer-logo.png';
import { FaGoogle } from 'react-icons/fa6';
import { FaApple, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SignInForm() {
  return (
    <div className="signin">
      <div className="signin__left-panel">
        <img className="signin__logo" src={formLogo} alt="Saladly logo" />
        <p className="signin__text">
          We are so excited to have you here. If you haven't already, create an
          account to get access to exclusive offers, rewards, and discounts.
        </p>

        <Link to="/sign-up" className="signin__link">
          Don't have an account? Sign up.
        </Link>
      </div>

      <div className="signin__right-panel">
        <form className="signin__form">
          <h2 className="signin__form-title">Sign In</h2>

          <input type="email" className="signin__input" placeholder="Email" />
          <input
            type="password"
            className="signin__input"
            placeholder="Password"
          />

          <button className="signin__button" type="submit">
            Sign In
          </button>

          <Link to="/sign-up" className="signin__sign-up">
            Don't have an account?{' '}
            <span className="signin__span">Sign up.</span>
          </Link>
        </form>

        <div className="signin__socials">
          <div className="signin__socials-icons">
            <a href="#" className="signin__socials-icon">
              <FaGoogle style={{ width: '2.5rem', height: '2.5rem' }} />
            </a>
            <a href="#" className="signin__socials-icon">
              <FaFacebook style={{ width: '2.5rem', height: '2.5rem' }} />
            </a>

            <a href="#" className="signin__socials-icon">
              <FaApple style={{ width: '2.5rem', height: '2.5rem' }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
