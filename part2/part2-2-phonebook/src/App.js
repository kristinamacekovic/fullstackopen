import React, { useState, useEffect } from "react";
import axios from "axios";
import { Numbers } from "./components/Numbers";
import { Form } from "./components/Form";
import { Filter } from "./components/Filter";
import server from "./services/server";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    // console.log('effect fired')
    axios.get("http://localhost:3000/persons").then(response => {
      // console.log('promise fulfilled')
      setPersons(response.data);
      setFilteredPersons(response.data);
      // console.log(response.data)
    });
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value.toLowerCase());
    let match = persons.filter(person => {
      return person.name.toLowerCase().includes(searchTerm);
    });
    setFilteredPersons(match);
  };

  const addToPhonebook = event => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (isInPersons(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      server.add(newPerson).then(data => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = id => {
    if (window.confirm("Do you really want to delete?")) {
      server.deleteEntry(id).then(person => persons.filter(p => p.id !== id));
    }
  };

  const isInPersons = name => {
    let match = persons.filter(person => {
      return person.name === name;
    });
    if (match.length) {
      return true;
    }
    return false;
  };

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
      <Numbers persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
