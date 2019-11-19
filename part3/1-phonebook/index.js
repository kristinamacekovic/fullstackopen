require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/phonebook')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
morgan.token('content', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :content'
  )
)

const generateID = () => {
  return Math.floor(Math.random() * 10000000)
}

const duplicate = name => {
  return persons.find(person => person.name === name)
}

let persons = [
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 1
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 2
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 3
  },
  {
    name: 'Arto Hellas',
    number: '1234',
    id: 4
  },
  {
    name: 'Kiko',
    number: '6687596',
    id: 5
  }
]

app.get('/', (req, res) => {
  res.status(301).redirect('/api/persons')
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      res.json(person.toJSON())
    })
    .catch(err => next(err))
})

app.get('/info', (req, res, next) => {
  Person.find()
    .countDocuments()
    .then(n => {
      let message = `Phonebook has info on ${n} people`
      res.send(`<p>${message}</p>`)
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const updatedPerson = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true })
    .then(updatedPerson => res.json(updatedPerson.toJSON()))
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

/* create a new entry */
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'content missing' })
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson
    .save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
    .catch(err => {
      console.log(err.res.data)
      next(err)
    })
})

// handling urls that aren't found
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// handling all errors
const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: 'duplicate!' })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
