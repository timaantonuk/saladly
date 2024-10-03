import './sign-up-form.scss';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';
import formLogo from '../../assets/footer-logo.png';

function SignUpForm() {
  // TODO FORM DESIGN!!!!

  return (
    <div className="signup">
      <div className="signup__left-panel">
        {/*<h2 className="signup__title">Come join us!</h2>*/}
        <img src={formLogo} alt="Saladly logo" />
        <p className="signup__text">
          We are so excited to have you here. If you haven't already, create an
          account to get access to exclusive offers, rewards, and discounts.
        </p>
        <a href="#" className="signup__link">
          Already have an account? Sign in.
        </a>
      </div>

      <div className="signup__right-panel">
        <form className="signup__form">
          <h2 className="signup__form-title">Signup</h2>
          <input type="text" className="signup__input" placeholder="Username" />
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
            Signup
          </button>

          <a href="#" className="signup__sign-in">
            Already have an account? Sign in.
          </a>
        </form>

        <div className="signup__socials">
          <div className="signup__socials-icons">
            <a href="#" className="signup__socials-icon">
              <FcGoogle style={{ width: '50px', height: '50px' }} />
            </a>
            <a href="#" className="signup__socials-icon">
              <FaFacebook style={{ width: '50px', height: '50px' }} />
            </a>

            <a href="#" className="signup__socials-icon">
              <FaApple style={{ width: '50px', height: '50px' }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
