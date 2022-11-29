import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
    return (
        <section className="profile">
            <h2 className="profile__title">Привет, Виталий!</h2>

            <div className="profile__info">
                <div className="profile__info-cont">
                    <p className="profile__subtitle">Имя</p>
                    <p className="profile__name">Виталий</p>
                </div>
                <div className="profile__info-cont">
                    <p className="profile__subtitle">E-mail</p>
                    <p className="profile__email">pochta@yandex.ru</p>
                </div>
            </div>

            <div className="profile__cont">
                <p className="profile__change">Редактировать</p>
                <Link to="signup" className="profile__link">Выйти из аккаунта</Link>
            </div>
        </section>
    );
}

export default Profile;