import './sign-up-form.scss';
import formLogo from '../../assets/footer-logo.png';
import { Link } from 'react-router-dom';
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
import { ChangeHandler, RefCallBack, useForm } from 'react-hook-form';

export interface IFormField {
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  ref: RefCallBack;
  name: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  type: string;
  placeholder: string;
}

// TODO SAVE USER DETAILS IN LOCAL STORAGE SIGN IN SIGN UP

function SignUpForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { register, handleSubmit, getValues, formState } = useForm<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>();
  console.log(getValues(), formState.errors);

  const handleRegister = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const { name, email, password, confirmPassword } = getValues();
      console.log(name, email, password, confirmPassword);
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const userPerson = auth.currentUser;
      console.log(userPerson);

      if (userPerson) {
        await setDoc(doc(db, 'Users', userPerson.uid), {
          email: userPerson.email,
          firstName: data.name,
        });

        dispatch(
          setUserT({
            name: data.name,
            email: userPerson?.email,
            avatar: '',
          }),
        );
      }

      console.log('User registered successfully');
      toast.success('Successfully registered!', {
        position: 'top-center',
      });
      navigate('/account');
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
      toast.error('Error in registration!', {
        position: 'bottom-center',
      });
    }
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

  const fields = [
    {
      type: 'text',
      placeholder: 'Full Name',
      ...register('name', { required: 'Name is required' }),
    },
    {
      type: 'email',
      placeholder: 'Email',
      ...register('email', {
        required: 'Email is required',
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Invalid email address',
        },
      }),
    },
    {
      type: 'password',
      placeholder: 'Password',
      ...register('password', {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters',
        },
      }),
    },
    {
      type: 'password',
      placeholder: 'Confirm Password',
      ...register('confirmPassword', {
        required: 'Please confirm your password',
        validate: (value) =>
          value === getValues('password') || 'Passwords do not match',
      }),
    },
  ];
  console.log(fields);

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
            onSubmit={handleSubmit(handleRegister)}
            linkText="Already have an account?"
            linkPath="/sign-in"
            spanText="Sign in."
            formState={formState}
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
