import React from 'react'
import { CountryDetail } from './CountryDetail'
const Results = ({ results }) => {
  let n = results.length
  if (n > 10) {
    return <p>Please specify more, too broad search</p>
  } else if (n > 1) {
    return (
      <ul>
        {results.map(country => (
          <li key={country.code}>{country.name}</li>
        ))}
      </ul>
    )
  } else return <CountryDetail country={results[0]} />
}
export { Results }
