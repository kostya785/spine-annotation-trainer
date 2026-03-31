import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "./Header.css";

function Header() {
  const { lang, toggleLang, theme, toggleTheme, t } = useContext(AppContext);

  return (
    <header className={`header ${theme}`}>
      <div className="left">
        <div className="logo">
        <img src={logo} alt="logo" className="header-logo" />


        </div>

        <nav className="nav">
          <Link to="/">{t.main}</Link>
          <Link to="/about">{t.about}</Link>
          <Link to="/trainer">{t.trainer}</Link>
        </nav>
      </div>

      <div className="right">
        <div className="socials">
          <a 
            href="https://t.me/+fKXZmB8WoeQwNTVi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon"
          >
            <img src={`${import.meta.env.BASE_URL}tg.png`} alt="Telegram" />
          </a>

          <a 
            href="https://vk.com/k_onstantinople" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon"
          >
           <img src={`${import.meta.env.BASE_URL}wk.png`} alt="VK" />
          </a>

          <a 
            href="mailto:kma785kma@gmail.com"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <img src={`${import.meta.env.BASE_URL}gmail.png`} alt="Gmail" />
          </a>

          <a 
            href="/max-404" 
            className="social-icon"
          >
            <img src={`${import.meta.env.BASE_URL}max.png`} alt="max" />
          </a>
        </div>

        

        <button className="lang-btn" onClick={toggleLang}>
          {lang === "ru" ? "RU" : "EN"}
        </button>
      </div>
    </header>
  );
}

export default Header;







