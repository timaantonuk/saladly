import './sign-in-form.scss';
import formLogo from '../../assets/footer-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import AuthForm from '../AuthForm/AuthForm.tsx';
import { auth, db, provider } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { IFormField } from '../SignUpForm/SignUpForm.tsx';
import { FcGoogle } from 'react-icons/fc';
import { CustomFirebaseError } from '../../types.ts';
import { setUserT } from '../../store/slices/userSlice/userSlice.ts';
import { useDispatch } from 'react-redux';

function SignInForm() {
  // Типизация состояния пользователя
  const [user, setUser] = useState<{ email: string; pass: string }>({
    email: '',
    pass: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, user.email, user.pass);
      const userPerson = auth.currentUser;

      dispatch(
        setUserT({
          name: userPerson?.displayName,
          email: userPerson?.email,
          avatar: '',
        }),
      );

      console.log(userPerson);

      console.log('user login success');
      toast.success('Successfully logged in!', {
        position: 'top-center',
      });
      navigate('/account');
    } catch (error: unknown) {
      // Приведение error к типу Error для корректной обработки
      if (error instanceof Error) {
        console.error('Error logging in:', error.message);
      } else {
        console.error('Unexpected error during login:', error);
      }

      toast.error('Error in login!', {
        position: 'bottom-center',
      });
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const userRef = doc(db, 'Users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // Пользователь уже есть в базе данных, можно получить его данные
          console.log('User data from database:', userSnap.data());
        } else {
          // Если по какой-то причине пользователь не был добавлен ранее, можно добавить его сейчас
          console.log('User not found in database, consider adding user data.');
          await setDoc(userRef, {
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
        }
        toast.success('Successfully logged in!', {
          position: 'top-center',
        });
        navigate('/account');
      }
    } catch (error) {
      const firebaseError = error as CustomFirebaseError;
      const errorCode = firebaseError.code;
      const errorMessage = firebaseError.message;
      const email = firebaseError.customData?.email || 'No email available';

      console.error(
        `Error: ${errorCode}, Message: ${errorMessage}, Email: ${email}`,
      );
      toast.error('Error in logging in', {
        position: 'bottom-center',
      });
    }
  };

  // Типизация полей формы
  const fields: IFormField[] = [
    {
      type: 'email',
      placeholder: 'Email',
      value: user.email,
      onChange: (value: string) =>
        setUser((prevState) => ({ ...prevState, email: value })),
    },
    {
      type: 'password',
      placeholder: 'Password',
      value: user.pass,
      onChange: (value: string) =>
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
            <button
              className="signin__sign-in-helper"
              onClick={handleLoginWithGoogle}
            >
              Sign In with Google{' '}
              <FcGoogle style={{ transform: 'translateY(-1px)' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
