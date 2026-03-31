import Lottie from "lottie-react";
import errorAnimation from "../assets/error.json";
import { Link } from "react-router-dom";
import "./PrettyError.css";

export default function PrettyError() {
  return (
    <div className="pretty-error">
      <div className="lottie-wrapper">
        <Lottie animationData={errorAnimation} loop autoplay />
      </div>

      <Link to="/" className="back-btn">Go Home</Link>
    </div>
  );
}
