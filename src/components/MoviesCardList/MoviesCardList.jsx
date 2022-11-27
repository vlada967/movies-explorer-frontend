import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import cards from '../../data';

function MoviesCardList() {
    const path = useLocation();

    function filterCards(card) {
        if ((path.pathname === '/saved-movies') && (card.isSaved)) {
            return (<MoviesCard
                card={card}
                key={card._id}
            />);
        } else if (path.pathname === '/movies' && (!card.isSaved)) {
            return (
                <MoviesCard
                    card={card}
                    key={card._id}
                />
            );
        }
    }

    if (!(!!cards && cards.length > 0)) {
        return (<Preloader />)
    }
    return (
        <section className="list">
            <div className="cards">
                {cards.map((card) => filterCards(card))}
            </div>
            <button className="cards__more">Ещё</button>
        </section>
    );
}

export default MoviesCardList;
