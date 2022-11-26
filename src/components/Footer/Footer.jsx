import { useLocation } from 'react-router-dom';

function Footer() {
    const path = useLocation();

    return (
        (path.pathname === '/' || path.pathname === '/movies' || path.pathname === '/saved-movies') ? (
            <footer className="footer">
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__cont">
                    <p className="footer__copy">&copy; {new Date().getFullYear()}</p>
                    <div className="footer__links">
                        <a href="https://practicum.yandex.ru/" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                        <a href="https://github.com/" className="footer__link" target="_blank" rel="noreferrer">Github</a>
                    </div>
                </div>
            </footer>
        ) : null
    );
}

export default Footer;