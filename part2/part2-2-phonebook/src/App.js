import React, { useState } from 'react'
import { Numbers } from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const handleChange = event => {
    setNewName(event.target.value)
  }

  const addToPhonebook = event => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    isInPersons(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPerson))

    setNewName('')
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
          name: <input value={newName} onChange={handleChange} />
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
