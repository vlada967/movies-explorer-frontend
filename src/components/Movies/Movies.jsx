import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ getMovies, onChange, movies, isLoading, isRequest, handleSaveMovie, search, handleSearchInputChange, handleCheckboxChange, error, onDelete, savedMovies, checkedShort }) {
    return (
        <main>
            < SearchForm
                onChange={onChange}
                onCheckboxChange={handleCheckboxChange}
                onSubmit={getMovies}
                search={search}
                checkedShort={checkedShort} />
            < MoviesCardList
                movies={movies}
                isLoading={isLoading}
                isRequest={isRequest}
                handleSaveMovie={handleSaveMovie}
                error={error}
                onDelete={onDelete}
                savedMovies={savedMovies} />
        </main>
    );
}

export default Movies;
