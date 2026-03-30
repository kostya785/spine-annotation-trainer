import "./About.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
function About() {
  const { t } = useContext(AppContext);
  return (
    <section className="about-page">

      <h1 className="about-title">{t.technology}</h1>

      <p className="subtitle">
        {t.philosophy}
      </p>

      <div className="about-grid">

        {/* 1 */}
        <div className="about-card">
  <div className="about-image">
    <img src="doctor.jpg" alt="Врач с медицинским снимком" />
  </div>
  <p className="about-text">
    {t.first}
  </p>
</div>

        {/* 2 */}
        <div className="about-card">
  <div className="about-image">
    <img src="puz.jpg" alt="Рентгеновские пазлы" />
  </div>
  <p className="about-text">
           {t.second}
          </p>
        </div>

        {/* 3 */}
        <div className="about-card">
  <div className="about-image">
    <img src="pixel.jpg" alt="Рентгеновские пазлы" />
  </div>
  <p className="about-text">
            {t.third}
          </p>
        </div>

        {/* 4 */}
        <div className="about-card">
  <div className="about-image">
    <img src="doc.jpg" alt="Рентгеновские пазлы" />
  </div>
  <p className="about-text">
            {t.fourth}
          </p>
        </div>

        {/* 5 */}
        <div className="about-card">
  <div className="about-image">
    <img src="neuron.jpg" alt="Рентгеновские пазлы" />
  </div>
  <p className="about-text">
            {t.fifth}
          </p>
        </div>

        {/* 6 */}
        <div className="about-card">
  <div className="about-image">
    <img src="students.jpg" alt="Рентгеновские пазлы" />
  </div>
  <p className="about-text">
            {t.six}
          </p>
        </div>

      </div>

    </section>
  );
}

export default About;
