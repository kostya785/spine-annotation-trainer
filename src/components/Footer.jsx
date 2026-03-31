import "./Footer.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Footer() {
  const { t } = useContext(AppContext);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-column">
          <div className="footer-brand">Konstantinopol</div>

          <div className="footer-note">
            {t.trainers} 
          </div>

          <div className="footer-copy">
            © {new Date().getFullYear()} Built by Konstantinopol
          </div>
        </div>

        <div className="footer-column">
          <div className="footer-links-title"></div>
          <Link to="/faq" className="footer-link">
            FAQ
          </Link>
          <a  href={`${import.meta.env.BASE_URL}manual.pdf`} target="_blank" rel="noreferrer" className="footer-link">
            {t.manual}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

