const mongoose = require("mongoose");

const n = process.argv.length;

if (n < 3) {
  console.log("please specify a password");
  process.exit(1);
}

if (n >= 3) {
  const pass = process.argv[2];
  const url = `mongodb+srv://fullstack:${pass}@cluster0-qpmvh.mongodb.net/phonebook?retryWrites=true&w=majority`;
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });
  const Person = mongoose.model("Person", personSchema);
  if (n === 3) {
    /* list all persons*/
    Person.find({}).then(result => {
      console.log("Phonebook:");
      result.forEach(person => console.log(`${person.name}: ${person.number}`));
      mongoose.connection.close();
    });
  } else {
    /* create a new note */
    const newPerson = new Person({
      name: process.argv[3],
      number: process.argv[4],
    });
    newPerson.save().then(response => {
      console.log(
        `added ${newPerson.name} number ${newPerson.number} to phonebook`
      );
      mongoose.connection.close();
    });
  }
}
