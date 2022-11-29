import { Link, useHistory } from 'react-router-dom';

function Navigation({ isOpen, onClose }) {
    const history = useHistory();

    function profile() {
        history.push('/profile');
        onClose();
    }

    return (
        <section className={isOpen ? 'nav nav_opened' : 'nav'}>
            <div className="nav__cont">
                <div className="nav__info">
                    <button type="button" onClick={() => onClose()} className="nav__close"></button>
                    <nav className="nav__links">
                        <Link to='/' className="nav__link">Главная</Link>
                        <Link to='movies' className="nav__link">Фильмы</Link>
                        <Link to='saved-movies' className="nav__link">Сохранённые фильмы</Link>
                    </nav>
                </div>
                <button type="button" className="nav__button" onClick={() => profile()} >Аккаунт</button>
            </div>
        </section>
    );
}

export default Navigation;
