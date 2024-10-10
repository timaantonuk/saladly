import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/firebase.ts';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './user-account.scss';

// Интерфейс для данных пользователя
interface IUserDetails {
  firstName: string;
  email: string;
  avatar: string;
}

function UserAccount() {
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null); // Указываем, что состояние может быть либо объектом IUserDetails, либо null
  const navigate = useNavigate();

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
          <h3 className="user-account__heading">
            Welcome {userDetails.firstName}
          </h3>
          <p>Account details</p>
          <div className="user-account__row">
            <p>Email</p>
            <span>{userDetails.email}</span>
          </div>
          <div className="user-account__row">
            <p>First name</p>
            <span>{userDetails.firstName}</span>
          </div>
          <img src={userDetails.avatar} alt="your avatar" />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserAccount;
