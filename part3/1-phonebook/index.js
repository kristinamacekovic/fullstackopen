const express = require("express");
const app = express();

let persons = [
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 1
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 2
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 3
  },
  {
    name: "Arto Hellas",
    number: "1234",
    id: 4
  },
  {
    name: "Kiko",
    number: "6687596",
    id: 5
  }
];

app.get("/api/persons", (req, res) => res.json(persons));

app.get("/api/persons/:id", (req, res) => {
  let id = Number(req.params.id);
  let person = persons.find(person => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send();
  }
});

app.get("/info", (req, res) => {
  let n = persons.length;
  let d = new Date();
  let message = `Phonebook has info on ${n} people`;
  let message2 = `${d}`;
  res.send(`<div><p>${message}</p>
                <p>${message2}</p></div>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
