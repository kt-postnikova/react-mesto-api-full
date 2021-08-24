import React from 'react';

function Footer() {

    const currentDate = new Date().getFullYear();

    return (
        <footer className="footer page__footer">
            <p className="footer__text">&copy; {currentDate} Mesto Russia</p>
        </footer>
    );
}

export default Footer;