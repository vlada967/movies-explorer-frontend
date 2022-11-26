function MoviesCard(card) {
    return (
        <section className="card">
            <img src={card.card.link} alt={card.card.name} className="card__image" />
            <div className="card__info">
                <h2 className="card__subtitle">{card.card.name}</h2>
                <label className="card__cont">
                    <input type="checkbox" />
                    <span className="card__radio" />
                </label>
            </div>
            <p className="card__duration">{card.card.duration}</p>
        </section>
    );
}

export default MoviesCard;