import "./Result.css";
import { useLocation, Link } from "react-router-dom";
import { useMemo, useContext } from "react";
import { AppContext } from "../context/AppContext";

function Result() {
  const { t } = useContext(AppContext);
  const location = useLocation();

  const reference = location.state?.reference;
  const referenceName = location.state?.referenceName;
  const userJson = location.state?.userJson;
  const image = location.state?.image;
  const imgSize = location.state?.imgSize;

  if (!reference || !userJson) {
    return (
      <section className="result-page">
        <h1 className="result-title">{t.nodata}</h1>
        <Link to="/" className="back-btn">{t.back}</Link>
      </section>
    );
  }

  const referencePolygons = reference.shapes || [];
  const userPolygons = userJson.shapes || [];

  const baseMetric = (ref, usr) => {
    if (!ref || !usr) return 0;
    const A = ref.points;
    const B = usr.points;
    const len = Math.min(A.length, B.length);
    if (len === 0) return 0;

    const softThreshold = 200; 

    let score = 0;
    for (let i = 0; i < len; i++) {
      const [ax, ay] = A[i];
      const [bx, by] = B[i];
      const dist = Math.hypot(ax - bx, ay - by);
      score += Math.max(0, 1 - dist / softThreshold);
    }
    return Math.round((score / len) * 100);
  };

  const overlapMetrics = (ref, usr, threshold = 60) => { 
    if (!ref || !usr) return { dice: 0, jaccard: 0 };

    const A = ref.points || [];
    const B = usr.points || [];
    if (A.length === 0 || B.length === 0) return { dice: 0, jaccard: 0 };

    let intersection = 0;
    const used = new Set();

    A.forEach(([ax, ay]) => {
      let best = Infinity;
      let bestIdx = -1;

      B.forEach(([bx, by], idx) => {
        if (used.has(idx)) return;
        const d = Math.hypot(ax - bx, ay - by);
        if (d < best) {
          best = d;
          bestIdx = idx;
        }
      });

      if (bestIdx !== -1 && best <= threshold) {
        intersection++;
        used.add(bestIdx);
      }
    });

    const union = A.length + B.length - intersection;
    const dice = union > 0 ? (2 * intersection) / (A.length + B.length) : 0;
    const jaccard = union > 0 ? intersection / union : 0;

    return {
      dice: Math.round(Math.min(100, dice * 100)),
      jaccard: Math.round(Math.min(100, jaccard * 100)),
    };
  };


  const findBestMatch = (refShape, availableUserShapes) => {
    let bestUsr = null;
    let bestScore = -1;

    availableUserShapes.forEach((usr) => {
      const b = baseMetric(refShape, usr);
      if (b > bestScore) {
        bestScore = b;
        bestUsr = usr;
      }
    });

    return bestUsr;
  };

  const results = useMemo(() => {
    const arr = [];
    const usedUser = new Set();

    referencePolygons.forEach((ref, i) => {
      const label = ref.label || String(i + 1);
      let usr = userPolygons.find(
        (u) => !usedUser.has(u) && String(u.label) === String(label)
      );

      if (!usr) {
        const available = userPolygons.filter((u) => !usedUser.has(u));
        usr = findBestMatch(ref, available);
      }

      if (usr) usedUser.add(usr);

      const base = usr ? baseMetric(ref, usr) : 0;
      const { dice, jaccard } = usr ? overlapMetrics(ref, usr) : { dice: 0, jaccard: 0 };

      arr.push({
        id: label,
        base,
        dice,
        jaccard,
      });
    });

    return arr;
  }, [referencePolygons, userPolygons]);

  const avg = (key) =>
    results.length === 0
      ? 0
      : Math.round(results.reduce((s, r) => s + r[key], 0) / results.length);

  const maxMetric = results.length === 0 ? 100 : Math.max(1, ...results.flatMap((r) => [r.base, r.dice, r.jaccard]));

  const imgSafe = image ?? "";
  const sizeSafe = imgSize ?? { w: 0, h: 0 };

  return (
    <section className="result-page">
      <div className="comparison-done-banner">
        <span className="comparison-done-icon">✓</span>
        <span>{t.compare}</span>
      </div>

      <h1 className="result-title">{t.result}</h1>

      <div className="result-section">
        <h2>{t.Photoused}</h2>
        <div className="image-preview-card">
          {imgSafe && <img src={imgSafe} alt="Снимок" className="result-image" />}
        </div>
      </div>

      <div className="result-section">
        <h2>{t.matcha}</h2>

        <table className="result-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>{t.base}</th>
              <th>Dice</th>
              <th>Jaccard</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.base}%</td>
                <td>{r.dice}%</td>
                <td>{r.jaccard}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="result-section">
        <h2>{t.summary}</h2>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">{avg("base")}%</div>
            <div className="metric-label">{t.base} ({t.accuracy})</div>
            <div className="metric-bar-wrap">
              <div className="metric-bar" style={{ width: `${avg("base")}%` }} />
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-value">{avg("dice")}%</div>
            <div className="metric-label">Dice ({t.intersection})</div>
            <div className="metric-bar-wrap">
              <div className="metric-bar metric-bar-dice" style={{ width: `${avg("dice")}%` }} />
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-value">{avg("jaccard")}%</div>
            <div className="metric-label">Jaccard ({t.similarity})</div>
            <div className="metric-bar-wrap">
              <div className="metric-bar metric-bar-jaccard" style={{ width: `${avg("jaccard")}%` }} />
            </div>
          </div>
        </div>

        <div className="overall-score">
          <span className="overall-label">{t.a}</span>
          <span className="overall-value">
            {Math.round((avg("base") + avg("dice") + avg("jaccard")) / 3)}%
          </span>
          <div className="metric-bar-wrap overall-bar">
            <div
              className="metric-bar metric-bar-overall"
              style={{
                width: `${Math.round((avg("base") + avg("dice") + avg("jaccard")) / 3)}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="result-buttons">
        <Link to="/" className="result-btn">{t.back}</Link>
        <Link to="/metrics-info" className="result-btn">{t.how}</Link>
      </div>
    </section>
  );
}

export default Result;
