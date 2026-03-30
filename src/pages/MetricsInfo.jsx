import "./MetricsInfo.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
function MetricsInfo() {
  const { t } = useContext(AppContext);
  return (
    <section className="metrics-info-page">
      <h1>{t.how}</h1>

      <div className="metric-tiles">
        <div className="metric-tile">
          <img src="base.png" alt="Базовая метрика" className="metric-img" />
          <h2>{t.base}</h2>
          <p>
            {t.r1}
          </p>
        </div>

        <div className="metric-tile">
          <img src="dice.png" alt="Dice коэффициент" className="metric-img" />
          <h2>Dice {t.coefficient}</h2>
          <p>
            {t.r2}
          </p>
        </div>

        <div className="metric-tile">
          <img src="jaccar.png" alt="Jaccard коэффициент" className="metric-img" />
          <h2>Jaccard {t.coefficient}</h2>
          <p>
            {t.r3}
          </p>
        </div>
      </div>

      <div className="metric-summary">
        <h2>{t.good}</h2>
        <ul>
          <li><b>80–100%</b> — {t.p1}</li>
          <li><b>60–80%</b> — {t.p2}</li>
          <li><b>40–60%</b> — {t.p3}</li>
          <li><b>0–40%</b> — {t.p4}</li>
        </ul>
      </div>

      <Link to="/result" className="back-btn">{t.back}</Link>
    </section>
  );
}

export default MetricsInfo;
