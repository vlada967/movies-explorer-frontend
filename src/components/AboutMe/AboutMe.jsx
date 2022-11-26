import photoPath from '../../images/photo.png';

function AboutMe() {
    return (
        <section className="me">
            <h2 className="me__title">Студент</h2>

            <div className="me__cont">
                <div className="me__info">
                    <h3 className="me__subtitle">Влада</h3>
                    <p className="me__descr">Фронтенд-разработчик, 20 лет</p>
                    <p className="me__text">Я живу в Новосибирске, учусь на факультете информационных технологий НГУ. С отличием закончила музыкальную школу и увлекаюсь изучением иностранных языков. Моя сильная сторона: умение кропотливо и вдумчиво работать над долгими проектами. </p>
                    <a href="https://github.com/vlada967" className="me__link">Github</a>
                </div>
                <img src={photoPath} alt="Моё фото" className="me__photo" />
            </div>
        </section>
    );
}

export default AboutMe;