import React, { useState } from 'react'
import { Numbers } from './components/Numbers'
import { Form } from './components/Form'
import { Filter } from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [searchTerm, setSearchTerm] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleSearch = event => {
    setSearchTerm(event.target.value.toLowerCase())
    let match = persons.filter(person => {
      return person.name.toLowerCase().includes(searchTerm)
    })
    setFilteredPersons(match)
  }

  const addToPhonebook = event => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    isInPersons(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPerson))

    setNewName('')
    setNewNumber('')
  }

  const isInPersons = name => {
    let match = persons.filter(person => {
      return person.name === name
    })
    if (match.length) {
      return true
    }
    return false
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <Form
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addToPhonebook={addToPhonebook}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} />
    </div>
  )
}

export default App
