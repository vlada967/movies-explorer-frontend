function AboutProject() {
    return (
        <section className="about">
            <h2 className="about__title">О проекте</h2>

            <div className="about__info">
                <div className="about__cont">
                    <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about__cont">
                    <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>

            <div className="about__line">
                <p className="about__line-text about__short about__green">1 неделя</p>
                <p className="about__line-text about__wide about__gray">4 недели</p>
            </div>

            <div className="about__underline">
                <p className="about__line-text about__short about__light-gray">Back-end</p>
                <p className="about__line-text about__wide about__light-gray">Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;