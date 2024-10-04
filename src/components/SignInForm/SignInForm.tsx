// import './sign-in-form.scss';
// import formLogo from '../../assets/footer-logo.png';
// import { FaGoogle } from 'react-icons/fa6';
// import { FaApple, FaFacebook } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../store/slices/userSlice.ts';
// import { useNavigate } from 'react-router-dom';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
//
// function SignInForm() {
//   const [email, setEmail] = useState('');
//   const [pass, setPass] = useState('');
//
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//
//   const handleLogin = (email, password) => {
//     const auth = getAuth();
//     signInWithEmailAndPassword(auth, email, password)
//       .then(({ user }) => {
//         console.log(user);
//         dispatch(
//           setUser({
//             email: user.email,
//             id: user.uid,
//             token: user.accessToken,
//           }),
//         );
//         navigate('/account');
//       })
//       .catch(console.error);
//   };
//
//   return (
//     <div className="signin">
//       <div className="signin__left-panel">
//         <img className="signin__logo" src={formLogo} alt="Saladly logo" />
//         <p className="signin__text">
//           We are so excited to have you here. If you haven't already, create an
//           account to get access to exclusive offers, rewards, and discounts.
//         </p>
//
//         <Link to="/sign-up" className="signin__link">
//           Don't have an account? Sign up.
//         </Link>
//       </div>
//
//       <div className="signin__right-panel">
//         <form className="signin__form">
//           <h2 className="signin__form-title">Sign In</h2>
//
//           <input
//             type="email"
//             className="signin__input"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             className="signin__input"
//             placeholder="Password"
//             value={pass}
//             onChange={(e) => setPass(e.target.value)}
//           />
//
//           <button
//             className="signin__button"
//             type="button"
//             onClick={() => handleLogin(email, pass)}
//           >
//             Sign In
//           </button>
//
//           <Link to="/sign-up" className="signin__sign-up">
//             Don't have an account?{' '}
//             <span className="signin__span">Sign up.</span>
//           </Link>
//         </form>
//
//         <div className="signin__socials">
//           <div className="signin__socials-icons">
//             <a href="#" className="signin__socials-icon">
//               <FaGoogle style={{ width: '2.5rem', height: '2.5rem' }} />
//             </a>
//             <a href="#" className="signin__socials-icon">
//               <FaFacebook style={{ width: '2.5rem', height: '2.5rem' }} />
//             </a>
//
//             <a href="#" className="signin__socials-icon">
//               <FaApple style={{ width: '2.5rem', height: '2.5rem' }} />
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default SignInForm;

// SignInForm.js

import './sign-in-form.scss';
import formLogo from '../../assets/footer-logo.png';
import { FaGoogle } from 'react-icons/fa6';
import { FaApple, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { setUser } from '../../store/slices/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AuthForm from '../AuthForm/AuthForm.tsx';
import { useDispatch } from 'react-redux';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = ({ email, password }) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          }),
        );
        navigate('/account');
      })
      .catch(console.error);
  };

  const fields = [
    { type: 'email', placeholder: 'Email', value: email, onChange: setEmail },
    {
      type: 'password',
      placeholder: 'Password',
      value: pass,
      onChange: setPass,
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
