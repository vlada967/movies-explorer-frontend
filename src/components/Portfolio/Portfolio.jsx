import arrowPath from '../../images/arrow.svg';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <a href="https://github.com/vlada967/react-mesto-api-full" className="portfolio__cont" target="_blank" rel="noreferrer">
                <p className="portfolio__text">Статичный сайт</p>
                <img src={arrowPath} alt="Стрелка" className="portfolio__arrow" />
            </a>
            <a href="https://github.com/vlada967/russian-travel" className="portfolio__cont" target="_blank" rel="noreferrer">
                <p className="portfolio__text">Адаптивный сайт</p>
                <img src={arrowPath} alt="Стрелка" className="portfolio__arrow" />
            </a>
            <a href="https://github.com/vlada967/how-to-learn" className="portfolio__cont" target="_blank" rel="noreferrer">
                <p className="portfolio__text">Одностраничное приложение</p>
                <img src={arrowPath} alt="Стрелка" className="portfolio__arrow" />
            </a>
        </section>
    );
}

export default Portfolio;