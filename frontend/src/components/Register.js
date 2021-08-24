import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register({ onRegister }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        onRegister(password, email)
    }

    return (
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <input
                    className="register__input"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Email"
                    type="email" />
                <input
                    className="register__input"
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="Пароль"
                    type="password" />
                <button className="register__button">Зарегистрироваться</button>
                <p className="register__link">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
            </form>
        </div>
    );
}

export default Register;