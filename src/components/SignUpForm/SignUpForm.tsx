import './sign-up-form.scss';
import { FaGoogle } from 'react-icons/fa6';
import { FaApple, FaFacebook } from 'react-icons/fa';
import formLogo from '../../assets/footer-logo.png';
import { Link } from 'react-router-dom';

function SignUpForm() {
  return (
    <div className="signup">
      <div className="signup__left-panel">
        <img className="signup__logo" src={formLogo} alt="Saladly logo" />
        <p className="signup__text">
          We are so excited to have you here. If you haven't already, create an
          account to get access to exclusive offers, rewards, and discounts.
        </p>
        <Link to="/sign-in" className="signup__link">
          Already have an account? Sign in.
        </Link>
      </div>

      <div className="signup__right-panel">
        <form className="signup__form">
          <h2 className="signup__form-title">Sign Up</h2>
          <input
            type="text"
            className="signup__input"
            placeholder="Full Name"
          />
          <input type="email" className="signup__input" placeholder="Email" />
          <input
            type="password"
            className="signup__input"
            placeholder="Password"
          />
          <input
            type="password"
            className="signup__input"
            placeholder="Confirm Password"
          />
          <button className="signup__button" type="submit">
            Sign Up
          </button>

          <Link to="/sign-in" className="signup__sign-in">
            Already have an account?{' '}
            <span className="signup__span">Sign in.</span>
          </Link>
        </form>

        <div className="signup__socials">
          <div className="signup__socials-icons">
            <a href="#" className="signup__socials-icon">
              <FaGoogle style={{ width: '2.5rem', height: '2.5rem' }} />
            </a>
            <a href="#" className="signup__socials-icon">
              <FaFacebook style={{ width: '2.5rem', height: '2.5rem' }} />
            </a>

            <a href="#" className="signup__socials-icon">
              <FaApple style={{ width: '2.5rem', height: '2.5rem' }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
