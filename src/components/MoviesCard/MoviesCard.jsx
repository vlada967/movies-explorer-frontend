import React from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ card, handleSaveMovie, onDelete }) {

    const path = useLocation();
    const serverUrl = 'https://api.nomoreparties.co/';

    function handleCheckboxChange() {
        if (card.isSaved) {
            onDelete(card);
        } else {
            handleSaveMovie(card);
        }
    }

    function handleCardDelete() {
        onDelete(card);
    }

    function getTime(min) {
        if (min < 60) {
            return `${min}м`;
        } else {
            return `${Math.floor(min / 60)}ч ${min % 60}м`;
        }
    }

    return (
        <section className="card">
            <a className='card__link' href={card.trailerLink} target='_blank' rel='noreferrer'>
                <img src={(path.pathname === '/saved-movies') ? (card.image) : (serverUrl + card.image.url)} alt={card.nameRU} className="card__image" />
            </a>
            <div className="card__info">
                <h2 className="card__subtitle">{card.nameRU}</h2>
                {(path.pathname === '/saved-movies') ? (
                    <button type="button" className="card__delete" onClick={handleCardDelete}></button>
                ) : (
                        <label className="card__cont">
                            <input type="checkbox" onChange={handleCheckboxChange} checked={card.isSaved ? true : false} />
                            <span className="card__radio" />
                        </label>
                    )}
            </div>
            <p className="card__duration">{getTime(card.duration)}</p>
        </section >
    );
}

export default MoviesCard;