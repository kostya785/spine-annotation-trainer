import Lottie from "lottie-react";
import errorAnimation from "../assets/error.json";
import "./PrettyError.css";

export default function PrettyError() {
  return (
    <div className="pretty-error">
      

      <div className="lottie-wrapper">
        <Lottie animationData={errorAnimation} loop autoplay />
      </div>

      <a href="/" className="back-btn">Go Home</a>
    </div>
  );
}
