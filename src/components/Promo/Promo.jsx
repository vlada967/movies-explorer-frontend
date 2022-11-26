import promoPath from '../../images/landing-logo.svg';

function Promo() {
    return (
        <section className="promo">
            <p className="promo__text">Учебный проект студента факультета Веб-разработки.</p>
            <img src={promoPath} alt="Логотип лэндинга" className="promo__img" />
        </section>
    );
}

export default Promo;