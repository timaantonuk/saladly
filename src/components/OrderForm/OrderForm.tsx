import './order-form.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  const userInfo = useSelector((state: RootState) => state.user);
  const isUserExist = userInfo.email !== '' && userInfo.name !== '';

  return (
    <div className="order-wrapper">
      <div className="order-data">
        <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
          {isUserExist ? (
            <>
              <input
                {...register('name')}
                type="text"
                placeholder="Your Name:"
                className="order-form__input order-form__input--name"
                value={userInfo.name}
              />
              <input
                {...register('email')}
                type="text"
                placeholder="Your Email:"
                className="order-form__input order-form__input--email"
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
                className="order-form__input order-form__input--address"
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
                className="order-form__input order-form__input--name"
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
                className="order-form__input order-form__input--email"
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
                className="order-form__input order-form__input--address"
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
            {isSubmitting ? 'Loading...' : 'Pay 108.95$'}
          </button>
        </form>
      </div>
      <div className="order-content">HELLO</div>
    </div>
  );
}

export default OrderForm;
