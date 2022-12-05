import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister, errMessage }) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [nameWrong, setNameWrong] = React.useState(true);
    const [emailWrong, setEmailWrong] = React.useState(true);
    const [passwordWrong, setPasswordWrong] = React.useState(true);
    const [nameError, setNameError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
        setIsActive(false);
        if (!nameWrong && !emailWrong && !passwordWrong) {
            setIsActive(true);
        }
    }, [nameWrong, emailWrong, passwordWrong])

    function handleNameChange(e) {
        setName(e.target.value);
        validateName(e.target.value);
    }

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
        onRegister(name, email, password);
        resetForm();
    }

    function resetForm() {
        setName('');
        setEmail('');
        setPassword('');
    }

    function validateName(name) {
        const re = /^[А-ЯA-ZёәіңғүұқөһӘІҢҒҮҰҚӨҺ\h-]+$/i;
        if (!name) {
            setNameWrong(true);
            setNameError('Поле не может быть пустым');
        } else if (!re.test(String(name).toLowerCase())) {
            setNameWrong(true);
            setNameError('Поле может содержать только латиницу, кириллицу, пробел или дефис');
        } else {
            setNameWrong(false);
            setNameError('');
        }
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
        <section className="register">
            <h2 className="register__title">Добро пожаловать!</h2>

            <form onSubmit={handleSubmit} className="register__form">
                <label htmlFor="name" className="register__label">Имя</label>
                <input
                    className="register__input"
                    id="name"
                    name="name"
                    type="name-input"
                    value={name}
                    required
                    onChange={handleNameChange}
                />
                {(nameWrong && nameError) && <div className="register__error">{nameError}</div>}
                <label htmlFor="email" className="register__label">E-mail</label>
                <input
                    className="register__input"
                    id="email"
                    name="email"
                    type="email-input"
                    value={email}
                    required
                    onChange={handleEmailChange}
                />
                {(emailWrong && emailError) && <div className="register__error">{emailError}</div>}
                <label htmlFor="password" className="register__label">Пароль</label>
                <input
                    className="register__input"
                    id="password"
                    name="password-input"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                {(passwordWrong && passwordError) && <div className="register__error">{passwordError}</div>}
                <div className="register__error-server">{errMessage}</div>
                <div className="register__button-container">
                    <button type="submit" className={isActive ? "register__button register__active" : "register__button"} disabled={isActive ? false : true} > Зарегистрироваться</button>
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