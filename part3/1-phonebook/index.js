const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

app.use(bodyParser.json());
morgan.token("content", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);

const generateID = () => {
  return Math.floor(Math.random() * 10000000);
};

const duplicate = name => {
  return persons.find(person => person.name === name);
};

let persons = [
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 1,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 2,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 3,
  },
  {
    name: "Arto Hellas",
    number: "1234",
    id: 4,
  },
  {
    name: "Kiko",
    number: "6687596",
    id: 5,
  },
];

app.get("/api/persons", (req, res) => res.json(persons));

app.get("/api/persons/:id", (req, res) => {
  let id = Number(req.params.id);
  let person = persons.find(person => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
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

app.delete("/api/persons/:id", (req, res) => {
  let id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  }

  if (duplicate(body.name)) {
    return res.status(400).json({
      error: "entry must be unique",
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateID(),
  };

  persons.concat(newPerson);

  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
