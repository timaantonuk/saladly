import footerLogo from '../../assets/footer-logo.png';
import './footer.scss';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { IoMail } from 'react-icons/io5';
import { FaPhoneVolume } from 'react-icons/fa6';
import { FaMapMarkedAlt } from 'react-icons/fa';

function Footer() {
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoidGltYWFudG9udWsiLCJhIjoiY20xc2Zhc3BsMDVtcTJpc2djbHEyaG5kcCJ9.magPvxvufOymSV-0JIOB3w';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11', // Стиль карты
      center: [-118.2437, 34.0522], // Координаты (Москва)
      zoom: 12,
    });

    // Добавление маркера
    new mapboxgl.Marker()
      .setLngLat([-118.2437, 34.0522]) // Координаты маркера
      .addTo(map);
  }, []);

  return (
    <footer className="footer">
      <div className="footer__info">
        <Link to="/">
          <img className="footer__logo" src={footerLogo} alt="Saladly logo" />
        </Link>
        <address className="footer__address">
          <FaMapMarkedAlt /> 10 Olvera St, Los Angeles, California
        </address>
        <a className="footer__phone" href="tel:+1554567910">
          <FaPhoneVolume /> +1 (554) 567-910
        </a>
        <a className="footer__email" href="mailto:info@saladly.com">
          <IoMail /> info@saladly.com
        </a>
        <div className="footer__divider"></div>
      </div>

      <div id="map" className="footer__map"></div>
    </footer>
  );
}

export default Footer;
