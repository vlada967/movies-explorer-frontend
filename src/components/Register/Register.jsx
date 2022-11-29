import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <section className="register">
            <h2 className="register__title">Добро пожаловать!</h2>

            <form className="register__form">
                <label htmlFor="name" className="register__label">Имя</label>
                <input
                    className="register__input"
                    id="name"
                    name="name"
                    type="name-input"
                    required
                />
                <label htmlFor="email" className="register__label">E-mail</label>
                <input
                    className="register__input"
                    id="email"
                    name="email"
                    type="email-input"
                    required
                />
                <label htmlFor="password" className="register__label">Пароль</label>
                <input
                    className="register__input"
                    id="password"
                    name="password-input"
                    type="password"
                    required
                />

                <div className="register__button-container">
                    <button type="submit" className="register__button">Зарегистрироваться</button>
                </div>

                <div className="register__signin">
                    <p className="register__quest">Уже зарегистрированы?</p>
                    <Link to="signin" className="register__login-link">Войти</Link>
                </div>
            </form>
        </section>
    );
}

export default Register;