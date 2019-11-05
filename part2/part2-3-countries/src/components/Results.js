import React from "react";
import { CountryDetail } from "./CountryDetail";

const Results = ({ results }) => {
  let n = results.length;
  const handleClick = event => {};
  if (n > 10) {
    return <p>Please specify more, too broad search</p>;
  } else if (n > 1) {
    return (
      <ul>
        {results.map(country => (
          <li key={country.code}>
            {country.name}
            <button onClick={handleClick}>Show More</button>
          </li>
        ))}
      </ul>
    );
  } else {
    return <CountryDetail country={results[0]}></CountryDetail>;
  }
};
export { Results };
