import React, { useState } from 'react'
import { Numbers } from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '04004364350943' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
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
      <form onSubmit={addToPhonebook}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <Numbers persons={persons} />
    </div>
  )
}

export default App
