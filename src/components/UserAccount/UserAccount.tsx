import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase/firebase.ts';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './user-account.scss';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice/userSlice.ts';
import { BiSolidUserCircle } from 'react-icons/bi';
import { IoIosExit } from 'react-icons/io';
import { convertTimestampToDate } from '../../utilFunctions.ts';
import {
  FaBowlFood,
  FaHouseUser,
  FaMoneyBill1Wave,
  FaSackDollar,
} from 'react-icons/fa6';
import { MdAccessTimeFilled } from 'react-icons/md';
import { IoNotifications } from 'react-icons/io5';
import { RootState } from '../../store/store.ts';

interface Cart {
  [orderId: string]: IOrder; // Orders indexed by order ID
}

// Интерфейс для данных пользователя
interface IUserDetails {
  cart: Cart;
  firstName: string;
  email: string;
  avatar: string;
  id: string;
}

interface CartItem {
  quantity: number; // Quantity of the item
  portion: string; // Portion size (e.g., "big", "medium")
  imageUrl: string; // URL of the item's image
  name: string; // Name of the item
  price: number; // Price of the item
}

interface IOrder {
  email: string; // Email of the user
  name: string; // Name of the user
  address: string; // Delivery address
  promocode: string; // Promo code applied
  cartItems: CartItem[]; // Array of cart items
  totalPrice: string; // Total price of the order (as a string)
  timestamp: {
    seconds: number; // Timestamp seconds
    nanoseconds: number; // Timestamp nanoseconds
  };
}

function UserAccount() {
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);

  const fetchUserOrders = async (userId: string): Promise<Cart | null> => {
    if (!userId) {
      console.log('User ID is not available');
      return null;
    }

    try {
      const docRef = doc(db, 'Users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as IUserDetails;
        return userData.cart || null;
      } else {
        console.log('User document does not exist.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user orders:', (error as Error).message);
      return null;
    }
  };

  const fetchUserData = async (): Promise<void> => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data() as IUserDetails;
          setUserDetails(userData);
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

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await fetchUserOrders(userId);
      if (orders) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        //set
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          cart: orders,
        }));
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

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
    <section className="user-account">
      {userDetails ? (
        <>
          <div className="wrapper">
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
            <p className="user-account__email">{userDetails.email}</p>
          </div>

          <div className="user-account__control-panel">
            <div className="user-account__orders">
              <h2 className="user-account__subtitle">Your orders:</h2>

              {userDetails.cart &&
              Object.values(userDetails.cart).length > 0 ? (
                Object.values(userDetails.cart).map((order: IOrder) => {
                  return (
                    <div
                      className="user-account__order"
                      key={order.timestamp.seconds}
                    >
                      <p className="user-account__order-info">
                        <FaBowlFood className="user-account__icon" />{' '}
                        {order.cartItems
                          .map((item) => `${item.name} X ${item.quantity}`)
                          .join(', ')}
                      </p>

                      <p>
                        <FaHouseUser className="user-account__icon" />{' '}
                        {order.address}
                      </p>
                      <p>
                        <FaSackDollar className="user-account__icon" />{' '}
                        {order.totalPrice}$
                      </p>
                      <p>
                        <MdAccessTimeFilled className="user-account__icon" />{' '}
                        {convertTimestampToDate(order.timestamp.seconds)}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="user-account__no-orders">
                  <IoNotifications />
                  No orders
                </p>
              )}
            </div>
            <div className="user-account__discounts">
              <h2 className="user-account__subtitle">Your discounts:</h2>

              <div className="user-account__promos">
                <p>
                  <FaMoneyBill1Wave /> Promo code -10%: SALAD2024
                </p>
              </div>
            </div>
          </div>

          <button className="user-account__logout-btn" onClick={handleLogout}>
            Logout <IoIosExit />
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}

export default UserAccount;
