import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({ onChange, onCheckboxChange, onCheckboxSavedChange, onSubmit, search, checkedShort, searchSaved }) {
    const [movieError, setMovieError] = React.useState('');
    const path = useLocation();

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

    // if (checkedShort === 'true') {
    //     checkedShort = true;
    // }
    // else if (checkedShort === 'false') {
    //     checkedShort = false;
    // }

    // if (path.pathname === '/saved-movies') {
    //     search = '';
    // }

    React.useEffect(() => {
        if (checkedShort === 'true') {
            checkedShort = true;
        }
        else if (checkedShort === 'false') {
            checkedShort = false;
        }
    }, [checkedShort])

    return (
        <section className="search">
            <form onSubmit={handleSubmit} className="search__form">
                <input
                    type="search"
                    placeholder="Фильм"
                    className="search__input"
                    value={(path.pathname === '/saved-movies') ? searchSaved : (search || '')}
                    required
                    onChange={handleMovieChange} />

                <button className="search__img"></button>
                <button type="submit" className="search__button">Найти</button>
            </form>
            {(movieError) && <div className="search__error">{movieError}</div>}
            <div className="search__cont">
                <label className="search__switch">
                    {(path.pathname === '/saved-movies') ?
                        <input type="checkbox" onChange={onCheckboxSavedChange} />
                        :
                        <input type="checkbox" onChange={onCheckboxChange} checked={checkedShort} />}
                    <span className="search__slider" />
                </label>
                <p className="search__text">Короткометражки</p>
            </div>
        </section>
    );
}

export default SearchForm;