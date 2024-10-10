import './sign-up-form.scss';
import formLogo from '../../assets/footer-logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm.tsx';
import { auth, db, provider } from '../../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { CustomFirebaseError } from '../../types.ts';
import { useDispatch } from 'react-redux';
import { setUserT } from '../../store/slices/userSlice/userSlice.ts';

export interface IFormField {
  type: 'text' | 'email' | 'password'; // допустимые типы input
  placeholder: string;
  value: string;
  onChange: (value: string) => void; // функция, принимающая новое значение
}

// TODO SAVE USER DETAILS IN LOCAL STORAGE SIGN IN SIGN UP

function SignUpForm() {
  const dispatch = useDispatch();

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

        dispatch(
          setUserT({
            name: user.name,
            email: userPerson?.email,
            avatar: '',
          }),
        );
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

  const handleRegisterWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (credential) {
        const token = credential.accessToken;
        console.log(token);
      }

      const user = result.user;
      if (user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          firstName: user.displayName,
          avatar: user.photoURL,
        });

        dispatch(
          setUserT({
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          }),
        );

        console.log('User data saved successfully.');
        console.log(user.photoURL);
        toast.success('Successfully registered!', {
          position: 'top-center',
        });
      }
    } catch (error) {
      const firebaseError = error as CustomFirebaseError;
      const errorCode = firebaseError.code;
      const errorMessage = firebaseError.message;
      const email = firebaseError.customData?.email || 'No email available';

      console.error(
        `Error: ${errorCode}, Message: ${errorMessage}, Email: ${email}`,
      );
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
            <button
              className="signup__sign-up-helper"
              onClick={handleRegisterWithGoogle}
            >
              Sign Up with Google{' '}
              <FcGoogle style={{ transform: 'translateY(-1px)' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
