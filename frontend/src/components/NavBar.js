import React from 'react';

function NavBar({ email, onSignOut }) {

    return (
        <div className="navbar">
            <p className="navbar__email">{email}</p>
            <button onClick={onSignOut} className="navbar__button">Выйти</button>
        </div>
    );
}

export default NavBar;