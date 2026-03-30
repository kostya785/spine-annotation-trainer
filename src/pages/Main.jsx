import "./Main.css";
import Lottie from "lottie-react";
import spineAnimation from "../assets/MRI.json";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
function Main() {
  const { t } = useContext(AppContext);
  return (
    <section className="main-page">
      <div className="leftmain">
        <h1>{t.trust}</h1>
        <p>
          {t.anattools}
        </p>
      </div>

      <div className="main-lottie-wrapper">
        <Lottie 
          animationData={spineAnimation} 
          loop 
          autoplay 
          className="main-lottie"
        />
      </div>
    </section>
  );
}

export default Main;
