import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/firebase.ts';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './user-account.scss';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice/userSlice.ts';
import { BiSolidUserCircle } from 'react-icons/bi';
import { IoIosExit } from 'react-icons/io';

// Интерфейс для данных пользователя
interface IUserDetails {
  firstName: string;
  email: string;
  avatar: string;
}

function UserAccount() {
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null); // Указываем, что состояние может быть либо объектом IUserDetails, либо null
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserData = async (): Promise<void> => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data() as IUserDetails); // Приведение типов
        } else {
          console.log('User document does not exist.');
        }
      } else {
        console.log('User is not logged in');
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log(userDetails);

  const handleLogout = async (): Promise<void> => {
    try {
      await auth.signOut();
      dispatch(removeUser());
      navigate('/');
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out', (error as Error).message);
    }
  };

  return (
    <div className="user-account">
      {userDetails ? (
        <>
          <div className="user-account__welcome-wrapper">
            <h3 className="user-account__heading">
              Welcome {userDetails.firstName}
            </h3>
            {userDetails.avatar ? (
              <img
                src={userDetails.avatar}
                className="user-account__avatar"
                alt="Your profile photo"
              />
            ) : (
              <BiSolidUserCircle
                style={{
                  width: '5rem',
                  height: '5rem',
                  color: '#52b788',
                }}
              />
            )}
          </div>

          {/*<p className="user-account__email">{userDetails.email}</p>*/}

          <div className="user-account__control-panel">
            <div className="user-account__orders">
              <h2 className="user-account__subtitle">Your orders:</h2>

              <div className="user-account__order">
                <p>10/12/2024 - Total: 77.84$</p>
                <p>2x Caesar Salad, 1x Marino Salad, 1x Dijon Salad</p>
              </div>
            </div>
            <div className="user-account__discounts">
              <h2 className="user-account__subtitle">Your discounts:</h2>

              <div className="user-account__promos">
                <p>Promo code -10%: SALAD2024</p>
              </div>
            </div>
          </div>

          <button className="user-account__logout-btn" onClick={handleLogout}>
            Logout from {userDetails.email} <IoIosExit />
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserAccount;
