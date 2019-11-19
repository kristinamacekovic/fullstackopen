import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Numbers } from './components/Numbers'
import { Form } from './components/Form'
import { Filter } from './components/Filter'
import { SuccessMessage } from './components/SuccessMessage'
import server from './services/server'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [succesMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    // console.log('effect fired')
    axios.get('/api/persons').then(response => {
      // console.log('promise fulfilled')
      setPersons(response.data)
      setFilteredPersons(response.data)
      // console.log(response.data)
    })
  }, [])

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
    let out = isInPersons(newName)
    if (out !== -1) {
      updatePerson(out, newPerson)
    } else {
      server
        .add(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
          setSuccessMessage('Successfully added new entry!')
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => alert("Couldn't add!"))
    }
  }

  const deletePerson = id => {
    if (window.confirm('Do you really want to delete?')) {
      server
        .deleteEntry(id)
        .then(person => {
          setPersons(persons.filter(p => p.id !== id))
          setSuccessMessage('Successfully deleted entry!')
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => alert('A problem occurred!'))
    }
  }

  const updatePerson = (id, changedObject) => {
    if (window.confirm('Do you really want to update the number?')) {
      server.updateEntry(id, changedObject).then(returnedObject => {
        setPersons(
          persons.map(person => (person.id !== id ? person : returnedObject))
        )
      })
    }
  }

  const isInPersons = name => {
    let match = persons.filter(person => {
      return person.name === name
    })
    if (match.length) {
      return match[0].id
    }
    return -1
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMessage message={succesMessage} />
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
      <Numbers persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
