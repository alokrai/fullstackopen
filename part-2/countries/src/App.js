import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayCountry = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many countries</p>;
  }
  if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name}>
            {country.name}
            <button onClick={() => <ShowCountry country={country} />}>
              show
            </button>
            <button onClick={() => alert("hello world")}>show2</button>
          </li>
        ))}
      </ul>
    );
  }
  if (countries.length === 1) {
    const country = countries[0];
    // why is removing return from here causing issues, function should
    // still be called?
    return <ShowCountry country={country} />;
  }
  // why do I see error if no null, is effect after render?
  return null;
};

const ShowCountry = ({ country }) => {
  console.log("hi");
  return (
    <>
      <h2>{country.name}</h2>
      <p>Capital {country.capital} </p>
      <p>population {country.population}</p>

      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
    </>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <div>
      <form>
        find countries:{" "}
        <input
          onChange={(event) => {
            setQuery(event.target.value.toLowerCase());
            setCountries(
              countries.filter((country) => {
                return country.name.toLowerCase().includes(query);
              })
            );
          }}
          value={query}
        />
      </form>
      <DisplayCountry countries={countries} />
    </div>
  );
}

export default App;
