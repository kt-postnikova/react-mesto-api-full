import React from 'react';

function Login({ onAuth }) {

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

        onAuth(password, email)
    }

    return (
        <div className="register">
            <h2 className="register__title">Вход</h2>
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
                <button className="register__button">Войти</button>
            </form>
        </div>
    );
}

export default Login;