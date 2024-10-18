import './order-form.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import driverImg from '../../assets/driver.png';
import { calculateTotal } from '../../utilFunctions.ts';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'; // Firestore functions
import { db } from '../../firebase/firebase.ts';
import { removeCartFromLocalStorage } from '../../store/slices/cartSlice/cartSlice.ts';

type FormFields = {
  name: string;
  email: string;
  promocode: string;
  address: string;
};

function OrderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const dispatch = useDispatch();

  const clearCart = () => {
    dispatch(removeCartFromLocalStorage()); // Dispatch the action
    localStorage.removeItem('cart'); // Also remove from localStorage
  };

  const userInfo = useSelector((state: RootState) => state.user);
  const cartInfo = useSelector((state: RootState) => state.cart.cartItems);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const orderData = {
        ...data,
        cartItems: cartInfo, // Store cart items directly in the order data
        totalPrice: calculateTotal(cartInfo),
        timestamp: new Date(),
      };

      const userRef = doc(db, 'Users', userInfo.id);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // User exists, update their document by adding the new order
        const currentCart = userSnap.data().cart || {};
        const newOrderIndex = Object.keys(currentCart).length + 1; // Calculate next order index

        // Add the new order to the user's cart
        await updateDoc(userRef, {
          [`cart.order${newOrderIndex}`]: orderData, // Use dynamic field name for the order
        });
        console.log('Order added to existing user:', orderData);
      } else {
        // User does not exist, create a new document with the first order
        await setDoc(userRef, {
          userId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          cart: {
            order1: orderData, // Initialize with the first order
          },
        });
        console.log('User created and order added:', orderData);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }

    clearCart();
    // navigate('/payment');
    const stripePaymentLink = 'https://buy.stripe.com/test_eVa9B3cL51lb8Y8145';
    window.location.href = stripePaymentLink;
  };

  const isUserExist = userInfo.email !== '' && userInfo.name !== '';

  return (
    <div className="order-wrapper">
      <div className="order-content">
        <img
          className="order-content__img"
          src={driverImg}
          alt="delivery driver"
        />
        <div className="order-content__bg-circle"></div>
      </div>
      <div className="order-data">
        <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="order-form__title">Purchase Salads</h1>

          {isUserExist ? (
            <>
              <input
                {...register('name')}
                type="text"
                placeholder="Your Name:"
                className={`order-form__input order-form__input--name ${errors.name ? 'order-form__input--error' : ''}`}
                value={userInfo.name}
              />
              <input
                {...register('email')}
                type="text"
                placeholder="Your Email:"
                className={`order-form__input order-form__input--email ${errors.email ? 'order-form__input--error' : ''}`}
                value={userInfo.email}
              />
              <input
                {...register('promocode')}
                type="text"
                placeholder="Promo Code:"
                className="order-form__input order-form__input--promocode"
              />
              <input
                {...register('address', { required: 'Address is required!' })}
                type="text"
                placeholder="Your Address:"
                className={`order-form__input order-form__input--address ${errors.address ? 'order-form__input--error' : ''}`}
              />
              {errors.address && (
                <p className="order-form__error">{errors.address.message}</p>
              )}
            </>
          ) : (
            <>
              <input
                {...register('name', { required: 'Name is required!' })}
                type="text"
                placeholder="Your Name:"
                className={`order-form__input order-form__input--name ${errors.name ? 'order-form__input--error' : ''}`}
              />
              {errors.name && (
                <p className="order-form__error">{errors.name.message}</p>
              )}
              <input
                {...register('email', {
                  required: 'Email is required!',
                  validate: (value) => {
                    if (!value.includes('@')) {
                      return 'Email must include @!';
                    }
                    return true;
                  },
                })}
                type="text"
                placeholder="Your Email:"
                className={`order-form__input order-form__input--email ${errors.email ? 'order-form__input--error' : ''}`}
              />
              {errors.email && (
                <p className="order-form__error">{errors.email.message}</p>
              )}
              <input
                {...register('promocode')}
                type="text"
                placeholder="Promo Code:"
                className="order-form__input order-form__input--promocode"
              />
              <input
                {...register('address', { required: 'Address is required!' })}
                type="text"
                placeholder="Your Address:"
                className={`order-form__input order-form__input--address ${errors.address ? 'order-form__input--error' : ''}`}
              />
              {errors.address && (
                <p className="order-form__error">{errors.address.message}</p>
              )}
            </>
          )}
          <button
            disabled={isSubmitting}
            type="submit"
            className="order-form__button"
          >
            {isSubmitting ? 'Loading...' : `Pay ${calculateTotal(cartInfo)}$`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
