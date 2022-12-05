import React from 'react';

function SearchForm({ onChange, onCheckboxChange, onSubmit, search, checkedShort }) {
    const [movieError, setMovieError] = React.useState('');

    function handleMovieChange(e) {
        onChange(e.target.value);
        if (!e.target.value) {
            setMovieError('Нужно ввести ключевое слово');
        } else {
            setMovieError('');
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <section className="search">
            <form onSubmit={handleSubmit} className="search__form">
                <input
                    type="search"
                    placeholder="Фильм"
                    className="search__input"
                    value={search}
                    required
                    onChange={handleMovieChange} />

                <button className="search__img"></button>
                <button type="submit" className="search__button">Найти</button>
            </form>
            {(movieError) && <div className="search__error">{movieError}</div>}
            <div className="search__cont">
                <label className="search__switch">
                    <input type="checkbox" onChange={onCheckboxChange} checked={(checkedShort) ? true : false} />
                    <span className="search__slider" />
                </label>
                <p className="search__text">Короткометражки</p>
            </div>
        </section>
    );
}

export default SearchForm;