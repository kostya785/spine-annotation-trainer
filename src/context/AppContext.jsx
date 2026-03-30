import { createContext, useState } from "react";
import { translations } from "../i18n";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [lang, setLang] = useState("ru");
  const [theme, setTheme] = useState("light");

  const toggleLang = () => {
    setLang(prev => (prev === "ru" ? "en" : "ru"));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const t = translations[lang];

  return (
    <AppContext.Provider value={{ lang, toggleLang, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}
