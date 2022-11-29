import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <section className="login">
            <h2 className="login__title">Рады видеть!</h2>

            <form className="login__form">
                <label htmlFor="email" className="login__label">E-mail</label>
                <input
                    className="login__input"
                    id="email"
                    name="email"
                    type="email-input"
                    required
                />
                <label htmlFor="password" className="login__label">Пароль</label>
                <input
                    className="login__input"
                    id="password"
                    name="password-input"
                    type="password"
                    required
                />

                <div className="login__button-container">
                    <button type="submit" className="login__button">Войти</button>
                </div>

                <div className="login__signin">
                    <p className="login__quest">Ещё не зарегистрированы?</p>
                    <Link to="signup" className="login__link">Регистрация</Link>
                </div>
            </form>
        </section>
    );
}

export default Login;