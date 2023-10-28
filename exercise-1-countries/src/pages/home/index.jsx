import { useState } from "react";
import countries from "../../data/countries";
import { Link } from "react-router-dom";

const formatNumber = (number) => {
  // use Intl.NumberFormat to format the number
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  return Intl.NumberFormat().format(number);
};

const Home = ({ search }) => {
  const [selectedContinent, setSelectedContinent] = useState("All");

  return (
    <>
      <div
        onClick={(e) => {
          if (e.target.tagName !== "BUTTON") return;
          setSelectedContinent(e.target.textContent);
        }}
        className="tabs"
      >
        <button className={`tab ${selectedContinent === "All" && "active"}`}>
          All
        </button>
        <button className={`tab ${selectedContinent === "Africa" && "active"}`}>
          Africa
        </button>
        <button
          className={`tab ${selectedContinent === "Americas" && "active"}`}
        >
          Americas
        </button>
        <button className={`tab ${selectedContinent === "Asia" && "active"}`}>
          Asia
        </button>
        <button className={`tab ${selectedContinent === "Europe" && "active"}`}>
          Europe
        </button>
        <button
          className={`tab ${selectedContinent === "Oceania" && "active"}`}
        >
          Oceania
        </button>
      </div>

      <div className="counties-container">
        {countries.map((country, i) => {
          if (
            selectedContinent !== "All" &&
            country.region !== selectedContinent
          )
            return null;
          if (
            search &&
            !country.name.official.toLowerCase().includes(search.toLowerCase())
          )
            return null;
          return (
            <div key={country.cca3} className="country">
              <img src={country.flags.png} alt={country.name.official} />
              <h3>{country.name.official}</h3>
              <div className="stats">
                <Stat label="Capital" value={country.capital} />
                <Stat
                  label="Population"
                  value={formatNumber(country.population)}
                />
                <Stat label="Region" value={country.region} />
                <Stat label="Subregion" value={country.subregion} />
                <Stat
                  label="Area"
                  value={formatNumber(country.area) + " km²"}
                />
                <Stat
                  label="Language"
                  value={Object.values(country.languages || {})[0]}
                />
              </div>
              <div className="links">
                <Link to={`/${country.cca3}`}>details</Link>
                <a>See on maps</a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;

const Stat = ({ label, value }) => {
  return (
    <div className="stat">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};
