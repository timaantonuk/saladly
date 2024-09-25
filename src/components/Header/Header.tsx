import React from 'react';
import './header.scss'
import logo from '../../assets/logo.png'
import {IoCartSharp, IoPersonCircleSharp} from "react-icons/io5";

function Header() {
    return (
        <header className='header'>

            <div className='header__controls'>
                <a className='header__logo' href="#"><img className='header__logo-img' src={logo}
                                                          alt="Saladly logo"/></a>
                <div className='header__text-content'>
                    <a className='header__title-link'><h1 className='header__title'>Saladly</h1></a>
                    <h2 className='header__subtitle'>The Tastiest and Largest Salads on Earth!</h2>
                </div>
            </div>

            {/*// TODO SEARCH BAR AT HEADER CENTER*/}

            <div className='header__buttons'>
                <button className='header__login-button' type='button'> <span className='header__login-text'>Account |</span> <IoPersonCircleSharp
                    style={{width: '40px', height: '40px'}}/></button>
                <button className='header__cart-button' type='button'><span className='header__cart-text'>100$ |</span>
                    <IoCartSharp style={{width: '40px', height: '40px'}}/></button>
            </div>

            <h3 className='header__subtitle-hidden'>The Tastiest and Largest Salads <br/> on Earth! Order now.</h3>

        </header>
    );
}

export default Header;