import { useParams } from "react-router-dom";
import "./index.css";
import countries from "../../data/countries";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const CountryInfo = () => {
  const params = useParams();

  const country = countries.find(
    (country) => country.cca3 === params.countryCode
  );

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, [params.countryCode]);

  return (
    <>
      <nav>
        <Link className="back-link" to="../">
          ⬅️ Back
        </Link>
      </nav>
      <div className="country-container">
        <div className="country-title">
          <h1>{country.name.common}</h1>
          <img
            width="100"
            height="100"
            src={country.flags.svg}
            alt={country.flags.alt}
            className="country-flag"
          />
        </div>
        <section className="country-details">
          <div className="country-basic-info">
            <p>
              <strong>Official Name:</strong> {country.name.official}
            </p>
            <p>
              <strong>Region:</strong> {country.region}
            </p>
            <p>
              <strong>Subregion:</strong> {country.subregion}
            </p>
            <p>
              <strong>Capital:</strong> {country.capital[0]}
            </p>
            <p>
              <strong>Population:</strong> {country.population}
            </p>
            <p>
              <strong>Area:</strong> {country.area} km²
            </p>
            <p>
              <strong>Timezone:</strong> {country.timezones[0]}
            </p>
          </div>

          <div className="country-maps">
            <h2>Maps:</h2>
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps
            </a>
            <a
              href={country.maps.openStreetMaps}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on OpenStreetMaps
            </a>
          </div>

          <div className="country-currencies">
            <h2>Currency</h2>
            {Object.entries(country.currencies).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value.name} ({value.symbol})
              </p>
            ))}
          </div>
        </section>

        <footer>
          Coat of Arms:{" "}
          <img
            src={country.coatOfArms.svg}
            alt="Coat of Arms"
            className="country-coat-of-arms"
          />
        </footer>
      </div>

      <div className="borders">
        <span>Neighbors</span>
        <ul>
          {country.borders.map((border) => (
            <li key={border}>
              <Link to={`/${border}`}>
                <img
                  src={
                    countries.find((country) => country.cca3 === border).flags
                      .svg
                  }
                  alt={
                    countries.find((country) => country.cca3 === border).name
                      .common
                  }
                  className="country-flag"
                />
                {border}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CountryInfo;
