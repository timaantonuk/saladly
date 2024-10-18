import Lottie from 'lottie-react';
import LoadingAnimation2 from '../../assets/loader2.json';
import './loader.scss';

const Loader = () => (
  <div className="loader">
    <Lottie animationData={LoadingAnimation2} loop={true} className="lottie" />
  </div>
);

export default Loader;
