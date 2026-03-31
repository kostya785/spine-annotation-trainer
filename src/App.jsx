import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Main from "./pages/Main";
import About from "./pages/About";
import Trainer from "./pages/Trainer";
import Result from "./pages/Result";
import FAQ from "./pages/FAQ";

import ErrorBoundary from "./components/ErrorBoundary";
import PrettyError from "./pages/PrettyError";
import MetricsInfo from "./pages/MetricsInfo";

function App() {
  const { theme } = useContext(AppContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ErrorBoundary fallback={<PrettyError />}>
      <Router>
        <Header />

        <main className="content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/trainer" element={<Trainer />} />
            <Route path="/result" element={<Result />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/metrics-info" element={<MetricsInfo />} />

            {/* Специальная страница для твоей ссылки "Macs" */}
            <Route path="/macs" element={<PrettyError />} />

            {/* Ловим любые неизвестные маршруты */}
            <Route path="*" element={<PrettyError />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
