import React, { useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import headerLogoPath from '../../images/logo.svg';

function Header({ loggedIn }) {
    const path = useLocation();
    const history = useHistory();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    function signIn() {
        history.push('/signin');
    }

    function profile() {
        history.push('/profile');
    }

    function openMenu() {
        setIsMenuOpen(true);
    }

    function closeMenu() {
        setIsMenuOpen(false);
    }

    return (
        <>
            {(path.pathname === '/signup' || path.pathname === '/signin') ? (
                <header className="header-signup">
                    <Link className="header__logo-signup" to='/'><img src={headerLogoPath} alt="Логотип" /></Link>
                </header>
            ) : (path.pathname === '/') ? (
                <header className="header">
                    <Link className="header__logo" to='/'><img src={headerLogoPath} alt="Логотип" /></Link>
                    {(!loggedIn) ? (
                        <div className="header__cont">
                            <Link to='signup' className="header__link">Регистрация</Link>
                            <button type="button" className="header__button" onClick={() => signIn()} >Войти</button>
                        </div>)
                        :
                        (<div className="header__cont">
                            <div className="header__cont-movies-main">
                                <Link to='movies' className="header__nav-main">Фильмы</Link>
                                <Link to='saved-movies' className="header__nav-main">Сохранённые фильмы</Link>
                            </div>
                            <button type="button" className="header__button-grey" onClick={() => profile()} >Аккаунт</button>
                            <button type="button" onClick={() => openMenu()} className="header__menu" ></button>
                        </div>)}
                </header>
            ) : (path.pathname === '/movies' || path.pathname === '/saved-movies' || path.pathname === '/profile') ? (
                <header className="header-movies">
                    <Link to='/' className="header__logo" ><img src={headerLogoPath} alt="Логотип" /></Link>
                    <div className="header__cont-movies">
                        <Link to='movies' className="header__nav">Фильмы</Link>
                        <Link to='saved-movies' className="header__nav">Сохранённые фильмы</Link>
                    </div>
                    <button type="button" className="header__button-grey" onClick={() => profile()} >Аккаунт</button>
                    <button type="button" onClick={() => openMenu()} className="header__menu" ></button>
                </header>
            ) : null}
            <Navigation isOpen={isMenuOpen} onClose={closeMenu} />
        </>
    );
}

export default Header;