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
    setPersons(persons.concat(newPerson))
    setNewName('')
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
