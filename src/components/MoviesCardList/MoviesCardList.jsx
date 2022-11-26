import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import cards from '../../data';

function MoviesCardList() {
    if (!(!!cards && cards.length > 0)) {
        return (<Preloader />)
    }
    return (
        <section className="list">
            <div className="cards">

                {cards.map((card) => (
                    <MoviesCard
                        card={card}
                        key={card._id}
                    />
                ))}
            </div>
            <button className="cards__more">Ещё</button>
        </section>
    );
}

export default MoviesCardList;