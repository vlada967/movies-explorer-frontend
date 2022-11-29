import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <section className="not-found">
            <div className="not-found__cont">
                <p className="not-found__error">404</p>
                <p className="not-found__text">Страница не найдена</p>
            </div>
            <Link to='/' className="not-found__link">Назад</Link>
        </section>
    );
}

export default NotFound;