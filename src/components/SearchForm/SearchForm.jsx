function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <input type="search" placeholder="Фильм" className="search__input" />
                <button className="search__img"></button>
                <button type="submit" className="search__button">Найти</button>
            </form>
            <div className="search__cont">
                <label className="search__switch">
                    <input type="checkbox" />
                    <span className="search__slider" />
                </label>
                <p className="search__text">Короткометражки</p>
            </div>
        </section>
    );
}

export default SearchForm;