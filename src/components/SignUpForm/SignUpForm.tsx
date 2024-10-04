import './sign-up-form.scss';
import { FaGoogle } from 'react-icons/fa6';
import { FaApple, FaFacebook } from 'react-icons/fa';
import formLogo from '../../assets/footer-logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm.tsx';
import { auth, db } from '../../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';

import { toast } from 'react-toastify';

export interface IFormField {
  type: 'text' | 'email' | 'password'; // допустимые типы input
  placeholder: string;
  value: string;
  onChange: (value: string) => void; // функция, принимающая новое значение
}

function SignUpForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    pass: '',
    confirmPass: '',
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.pass);
      const userPerson = auth.currentUser;
      console.log(userPerson);

      if (userPerson) {
        await setDoc(doc(db, 'Users', userPerson.uid), {
          email: userPerson.email,
          firstName: user.name,
        });
      }

      console.log('User registered successfully');
      toast.success('Successfully registered!', {
        position: 'top-center',
      });
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
      toast.error('Error in registration!', {
        position: 'bottom-center',
      });
    }
    navigate('/account');
  };

  const fields: IFormField[] = [
    {
      type: 'text',
      placeholder: 'Full Name',
      value: user.name,
      onChange: (value) =>
        setUser((prevState) => ({ ...prevState, name: value })), // Обновлено
    },
    {
      type: 'email',
      placeholder: 'Email',
      value: user.email,
      onChange: (value) =>
        setUser((prevState) => ({ ...prevState, email: value })), // Обновлено
    },
    {
      type: 'password',
      placeholder: 'Password',
      value: user.pass,
      onChange: (value) =>
        setUser((prevState) => ({ ...prevState, pass: value })), // Обновлено
    },
    {
      type: 'password',
      placeholder: 'Confirm Password',
      value: user.confirmPass,
      onChange: (value) =>
        setUser((prevState) => ({ ...prevState, confirmPass: value })), // Обновлено
    },
  ];

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
        <div className="signup__form">
          <AuthForm
            title="Sign Up"
            fields={fields}
            buttonText="Sign Up"
            onSubmit={handleRegister}
            linkText="Already have an account?"
            linkPath="/sign-in"
            spanText="Sign in."
          />
        </div>

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
