import React, { useState, useEffect } from 'react'
import { Results } from './components/Results'
import { Search } from './components/Search'
import axios from 'axios'

const App = () => {
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('all')

  useEffect(
    () => {
      console.log('fetching countries...')
      axios
        .get(`https://restcountries.eu/rest/v2/name/${searchTerm}`)
        .then(response => {
          console.log('fetch successfull')
          setFilteredCountries(response.data)
          console.log(filteredCountries)
        })
    },
    [searchTerm]
  )

  const handleSearch = event => {
    let term = event.target.value
    if ((term = '')) {
      setSearchTerm('all')
    } else {
      setSearchTerm(term)
    }
  }

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <Results results={filteredCountries} />
    </div>
  )
}

export default App
