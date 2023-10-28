import "./App.css";
import countries from "./data/countries";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CountryInfo from "./pages/country";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const [search, setSearch] = useState("");

  return (
    <>
      <header>
        <div className="max-1000">
          <div className="site-title">
            <h1 className="title">CountryPedia</h1>
            <p className="description">Learn about countries</p>
          </div>
          {location.pathname === "/" && (
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search"
              type="search"
              placeholder="Search"
            />
          )}
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/:countryCode" element={<CountryInfo />} />
        </Routes>
      </main>
      <footer>
        <p>
          Made with ❤️ at{" "}
          <a href="https://code213.tech" target="_blank" rel="noreferrer">
            Code213
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
