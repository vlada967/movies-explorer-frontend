import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ movies, isLoading, isRequest, movie, checked, handleSaveMovie, error, onDelete }) {
    const [moviesNumber, setMoviesNumber] = React.useState(checkNumber(window.innerWidth));
    const [addNumber, setAddNumber] = React.useState(checkNumber(window.innerWidth));
    const [movieList, setMovieList] = React.useState([]);
    const path = useLocation();

    useEffect(() => {
        setMoviesNumber(checkNumber(window.innerWidth));
        setAddNumber(checkAddNumber(window.innerWidth));
    }, [window.innerWidth]);

    useEffect(() => {
        setMovieList(movies.slice(0, moviesNumber));
    }, [moviesNumber, movies]);

    function checkNumber(width) {
        if (width > 1112) {
            return 16;
        } else if (width > 912) {
            return 12;
        } else if (width > 721) {
            return 8;
        } else {
            return 5;
        }
    }

    function checkAddNumber(width) {
        if (width > 1112) {
            return 4;
        } else if (width > 912) {
            return 3;
        } else if (width > 721) {
            return 2;
        } else {
            return 5;
        }
    }

    if (error) {
        return (
            <section className="list">
                <p className="list__not-found">Во время запроса произошла ошибка.
                Возможно, проблема с соединением или сервер недоступен.
                  Подождите немного и попробуйте ещё раз.</p>
            </section>
        );
    } else if (isLoading) {
        return (
            <Preloader />
        );
    } else if ((movies.length === 0) && (isRequest)) {
        return (
            <section className="list">
                <p className="list__not-found">Ничего не найдено</p>
            </section>
        );
    } else if (!movies) {
        return (
            <section className="list">
            </section>
        );
    }

    return (
        <section className="list">
            {(path.pathname === '/movies') ?
                (<div className="cards">
                    {movieList.map((movie) => {
                        return (
                            < MoviesCard
                                card={movie}
                                key={movie.id}
                                handleSaveMovie={handleSaveMovie}
                                onDelete={onDelete}
                            />)
                    })}
                </div>)
                :
                (<div className="cards">
                    {movieList.map((movie) => {
                        return (
                            < MoviesCard
                                card={movie}
                                key={movie.movieId}
                                handleSaveMovie={handleSaveMovie}
                                onDelete={onDelete}
                            />)
                    })}
                </div>)}
            <button onClick={() => setMoviesNumber(moviesNumber + addNumber)} className={(moviesNumber >= movies.length) ? "cards__more cards__none" : "cards__more"}>Ещё</button>
        </section>
    );
}

export default MoviesCardList;
