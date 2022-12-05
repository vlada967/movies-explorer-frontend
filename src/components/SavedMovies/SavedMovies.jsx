import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies, onDelete, handleCheckboxChange, onChange, onSubmit }) {
    return (
        <main>
            < SearchForm
                onCheckboxChange={handleCheckboxChange}
                onChange={onChange}
                onSubmit={onSubmit} />
            < MoviesCardList
                movies={movies}
                onDelete={onDelete} />
        </main>
    );
}

export default SavedMovies;
