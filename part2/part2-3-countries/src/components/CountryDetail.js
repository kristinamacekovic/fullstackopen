import React from "react";
import axios from "axios";
const CountryDetail = props => {
  let { capital, flag, name, population } = { ...props.country };
  const getWeather = capital => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=0d7c815c8af370ad9856b8866ce4a0bd&query=${capital}`
      )
      .then(response => console.log(response.data));
  };

  return (
    <div>
      <img src={`${flag}`} alt={`${name}_flag`} height="100px" width="200px" />
      <p>Capital: {name}</p>
      <p>Population: {population}</p>
      <div>
        <p>{`Weather in ${capital}`}</p>
      </div>
    </div>
  );
};

export { CountryDetail };
