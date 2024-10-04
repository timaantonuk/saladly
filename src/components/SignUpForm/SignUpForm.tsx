// import './sign-up-form.scss';
// import { FaGoogle } from 'react-icons/fa6';
// import { FaApple, FaFacebook } from 'react-icons/fa';
// import formLogo from '../../assets/footer-logo.png';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { setUser } from '../../store/slices/userSlice.ts';
// import { useDispatch } from 'react-redux';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
//
// function SignUpForm() {
//   const [email, setEmail] = useState('');
//   const [pass, setPass] = useState('');
//   const [repeatPass, setRepeatPass] = useState('');
//   const [name, setName] = useState('');
//
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//
//   const handleRegister = (email, password, name) => {
//     const auth = getAuth();
//
//     createUserWithEmailAndPassword(auth, email, password)
//       .then(({ user }) => {
//         updateProfile(user, {
//           displayName: name,
//         }).then(() => {
//           dispatch(
//             setUser({
//               name: user.displayName,
//               email: user.email,
//               id: user.uid,
//               token: user.accessToken,
//             }),
//           );
//           navigate('/account');
//         });
//       })
//       .catch(console.error);
//   };
//
//   return (
//     <div className="signup">
//       <div className="signup__left-panel">
//         <img className="signup__logo" src={formLogo} alt="Saladly logo" />
//         <p className="signup__text">
//           We are so excited to have you here. If you haven't already, create an
//           account to get access to exclusive offers, rewards, and discounts.
//         </p>
//         <Link to="/sign-in" className="signup__link">
//           Already have an account? Sign in.
//         </Link>
//       </div>
//
//       <div className="signup__right-panel">
//         <form className="signup__form">
//           <h2 className="signup__form-title">Sign Up</h2>
//           <input
//             type="text"
//             className="signup__input"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="email"
//             className="signup__input"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             className="signup__input"
//             placeholder="Password"
//             value={pass}
//             onChange={(e) => setPass(e.target.value)}
//           />
//           <input
//             type="password"
//             className="signup__input"
//             placeholder="Confirm Password"
//             value={repeatPass}
//             onChange={(e) => setRepeatPass(e.target.value)}
//           />
//           <button
//             className="signup__button"
//             type="button"
//             onClick={() => handleRegister(email, pass, name)}
//           >
//             Sign Up
//           </button>
//
//           <Link to="/sign-in" className="signup__sign-in">
//             Already have an account?{' '}
//             <span className="signup__span">Sign in.</span>
//           </Link>
//         </form>
//
//         <div className="signup__socials">
//           <div className="signup__socials-icons">
//             <a href="#" className="signup__socials-icon">
//               <FaGoogle style={{ width: '2.5rem', height: '2.5rem' }} />
//             </a>
//             <a href="#" className="signup__socials-icon">
//               <FaFacebook style={{ width: '2.5rem', height: '2.5rem' }} />
//             </a>
//
//             <a href="#" className="signup__socials-icon">
//               <FaApple style={{ width: '2.5rem', height: '2.5rem' }} />
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default SignUpForm;

import './sign-up-form.scss';
import { FaGoogle } from 'react-icons/fa6';
import { FaApple, FaFacebook } from 'react-icons/fa';
import formLogo from '../../assets/footer-logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { setUser, setUserFullName } from '../../store/slices/userSlice.ts';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm.tsx';
import { useDispatch } from 'react-redux';

function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = ({ email, password, name }) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(name);
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            dispatch(
              setUserFullName({
                fullName: name,
              }),
            );
          })
          .then(() => {
            dispatch(
              setUser({
                name: name,
                email: user.email,
                id: user.uid,
                token: user.accessToken,
              }),
            );
            navigate('/account');
          });
      })
      .catch(console.error);
  };

  const fields = [
    { type: 'text', placeholder: 'Full Name', value: name, onChange: setName },
    { type: 'email', placeholder: 'Email', value: email, onChange: setEmail },
    {
      type: 'password',
      placeholder: 'Password',
      value: pass,
      onChange: setPass,
    },
    {
      type: 'password',
      placeholder: 'Confirm Password',
      value: confirmPass,
      onChange: setConfirmPass,
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
