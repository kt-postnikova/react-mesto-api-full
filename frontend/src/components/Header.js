import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {
    return (
        <header className="header page__header">
            <a href="#" target="_self"><img className="header__logo" src={headerLogo}
                alt="Логотип Место" /></a>
        </header>
    );
}

export default Header;