import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ getMovies, onChange, movies, isLoading, isRequest, handleSaveMovie, search, handleSearchInputChange, handleCheckboxChange, error, checkedShort, onDelete }) {
    function onSubmit() {
        getMovies();
    }

    return (
        <main>
            < SearchForm
                onChange={onChange}
                onCheckboxChange={handleCheckboxChange}
                onSubmit={onSubmit}
                search={search}
                checkedShort={checkedShort} />
            < MoviesCardList
                movies={movies}
                isLoading={isLoading}
                isRequest={isRequest}
                handleSaveMovie={handleSaveMovie}
                error={error}
                onDelete={onDelete} />
        </main>
    );
}

export default Movies;