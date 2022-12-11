import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies, onDelete, handleCheckboxChange, onChange, onSubmit, isLoading, searchSaved }) {
    // console.log('in SavedMovies component', movies)
    return (
        <main>
            < SearchForm
                onCheckboxSavedChange={handleCheckboxChange}
                onChange={onChange}
                searchSaved={searchSaved}
                onSubmit={onSubmit} />
            < MoviesCardList
                savedMovies={movies}
                onDelete={onDelete}
                isLoading={isLoading} />
        </main>
    );
}

export default SavedMovies;
