import './sign-in-form.scss';
import formLogo from '../../assets/footer-logo.png';
import { FaGoogle } from 'react-icons/fa6';
import { FaApple, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthForm from '../AuthForm/AuthForm.tsx';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';

function SignInForm() {
  const [user, setUser] = useState({
    email: '',
    pass: '',
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, user.email, user.pass);
      console.log('user login success');
      toast.success('Successfully logged in!', {
        position: 'top-center',
      });
    } catch (error) {
      console.log(error.message);
      console.log(user.email, user.pass);
      toast.error('Error in login!', {
        position: 'bottom-center',
      });
    }
    navigate('/account');
  };

  const fields = [
    {
      type: 'email',
      placeholder: 'Email',
      value: user.email,
      onChange: (value) =>
        setUser((prevState) => ({ ...prevState, email: value })),
    },
    {
      type: 'password',
      placeholder: 'Password',
      value: user.pass,
      onChange: (value) =>
        setUser((prevState) => ({ ...prevState, pass: value })),
    },
  ];

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
        <div className="signin__form">
          <AuthForm
            title="Sign In"
            fields={fields}
            buttonText="Sign In"
            onSubmit={handleLogin}
            linkText="Don't have an account?"
            linkPath="/sign-up"
            spanText="Sign up."
          />
        </div>

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
