import React from 'react';
import NavBar from './NavBar';
import headerLogo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, email, onSignOut }) {

    const userLocation = useLocation();

    return (
        <header className="header page__header">
            <Link to="/main-page"><img className="header__logo" src={headerLogo}
                alt="Логотип Место" /></Link>
            {
                loggedIn ?
                    <NavBar email={email} onSignOut={onSignOut} /> :
                    (<>{
                        userLocation.pathname === '/signin' ?
                            <Link to="/signup" className="header__link">Регистрация</Link> :
                            <Link to="/signin" className="header__link">Войти</Link>
                    } </>)
            }
        </header>
    );
}

export default Header;