import './success.scss';
import courierImg from '../../assets/courier.png';

function Success() {
  return (
    <section className="success">
      <h1 className="success__heading">Thank you for the order!</h1>
      <p className="success__description">Courier is coming</p>
      <img className="success__img" src={courierImg} alt="" />
    </section>
  );
}

export default Success;
