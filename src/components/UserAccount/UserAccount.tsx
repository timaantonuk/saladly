import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './user-account.scss';

function UserAccount() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, 'Users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log('user is not logged in');
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
      console.log('user logged out successfully');
    } catch (error) {
      console.error('Error logging out', error.message);
    }
  };

  return (
    <div className="user-account">
      {userDetails ? (
        <>
          <h3 className="user-account__heading">
            Welcome {userDetails.firstName}
          </h3>
          <p>email - {userDetails.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserAccount;
