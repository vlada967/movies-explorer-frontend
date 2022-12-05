import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onSignOut, onUpdate }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.data.name);
    const [email, setEmail] = React.useState(currentUser.data.email);
    const [nameWrong, setNameWrong] = React.useState(false);
    const [emailWrong, setEmailWrong] = React.useState(false);
    const [nameError, setNameError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [isActive, setIsActive] = React.useState(false);

    useEffect(() => {
        setIsActive(false);
        if ((!nameWrong && !emailWrong) && (currentUser.data.name !== name && currentUser.data.email !== email)) {
            setIsActive(true);
        }
    }, [nameWrong, emailWrong, name, email]);

    function handleNameChange(e) {
        setName(e.target.value);
        validateName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
        validateEmail(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdate(name, email);
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

    return (
        <section className="profile">
            <h2 className="profile__title">{`Привет, ${currentUser.data.name}!`}</h2>

            <form className='profile__info' onSubmit={handleSubmit}>
                <div className="profile__info-cont">
                    <p className="profile__subtitle">Имя</p>
                    <input
                        className="profile__name"
                        id="name"
                        name="name"
                        type="name-input"
                        value={name}
                        required
                        onChange={handleNameChange}
                    />
                </div>
                {(nameWrong && nameError) && <div className="profile__error">{nameError}</div>}
                <div className="profile__info-cont">
                    <p className="profile__subtitle">E-mail</p>
                    <input
                        className="profile__email"
                        id="email"
                        name="email"
                        type="email-input"
                        value={email}
                        required
                        onChange={handleEmailChange}
                    />
                </div>
                {(emailWrong && emailError) && <div className="profile__error">{emailError}</div>}

                <div className="profile__cont">
                    <button type="submit" className={isActive ? "profile__change profile__active" : "profile__change"} disabled={isActive ? false : true}>Редактировать</button>
                    <Link to="signup" className="profile__link" onClick={onSignOut}>Выйти из аккаунта</Link>
                </div>
            </form>
        </section>
    );
}

export default Profile;