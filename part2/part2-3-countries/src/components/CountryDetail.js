import React from 'react'
import axios from 'axios'
const CountryDetail = props => {
  let { capital, flag, name, population } = { ...props.country }
  const getWeather = async capital => {
    let res = await axios.get(
      `http://api.weatherstack.com/current?access_key=0d7c815c8af370ad9856b8866ce4a0bd&query=${capital}`
    )
    let data = res.data
    return data
  }

  let { current } = getWeather(capital)
  return (
    <div>
      <img src={`${flag}`} alt={`${name}_flag`} height='100px' width='200px' />
      <p>Capital: {name}</p>
      <p>Population: {population}</p>
      <div>
        <p>{`Weather in ${capital}`}</p>
        {/* <p>{`Temperature: ${temperature}`}</p>
        <img src={weather_icons[0]} alt='weather icon' />
        <p>{weather_descriptions[0]}</p> */}
        {console.log(current)}
      </div>
    </div>
  )
}

export { CountryDetail }
