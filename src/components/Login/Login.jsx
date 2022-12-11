import React from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin, errMessage }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailWrong, setEmailWrong] = React.useState(true);
    const [passwordWrong, setPasswordWrong] = React.useState(true);
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
        setIsActive(false);
        if (!emailWrong && !passwordWrong) {
            setIsActive(true);
        }
    }, [emailWrong, passwordWrong])

    function handleEmailChange(e) {
        setEmail(e.target.value);
        validateEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        validatePassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(email, password);
        resetForm();
    }

    function resetForm() {
        setEmail('');
        setPassword('');
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email) {
            setEmailWrong(true);
            setEmailError('Поле не может быть пустым');
        } else if (!re.test(String(email).toLowerCase())) {
            setEmailWrong(true);
            setEmailError('Некорректный email');
        } else {
            setEmailWrong(false);
            setEmailError('');
        }
    }

    function validatePassword(password) {
        if (!password) {
            setPasswordWrong(true);
            setPasswordError('Поле не может быть пустым');
        } else {
            setPasswordWrong(false);
            setPasswordError('');
        }
    }


    return (
        <section className="login">
            <h2 className="login__title">Рады видеть!</h2>

            <form onSubmit={handleSubmit} className="login__form">
                <label htmlFor="email" className="login__label">E-mail</label>
                <input
                    className="login__input"
                    id="email"
                    name="email"
                    type="email-input"
                    value={email}
                    required
                    onChange={handleEmailChange}
                />
                {(emailWrong && emailError) && <div className="login__error">{emailError}</div>}
                <label htmlFor="password" className="login__label">Пароль</label>
                <input
                    className="login__input"
                    id="password"
                    name="password-input"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                {(passwordWrong && passwordError) && <div className="login__error">{passwordError}</div>}
                <div className="register__error-server">{errMessage}</div>
                <div className="login__button-container">
                    <button type="submit" className={isActive ? "login__button login__active" : "login__button"} disabled={isActive ? false : true}>Войти</button>
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