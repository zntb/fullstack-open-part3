/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config();

const name = process.argv[2];
const number = process.argv[3];

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB');

    if (!name && !number) {
      return listAllEntries();
    } else if (name && number) {
      return addEntry(name, number);
    } else {
      console.log('Please provide both name and number to add an entry.');
      mongoose.connection.close();
    }
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

function addEntry(name, number) {
  const person = new Person({ name, number });

  return person.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook`);
    return listAllEntries();
  });
}

function listAllEntries() {
  return Person.find({}).then(persons => {
    console.log('Phonebook:');
    persons.forEach(person => {
      console.log(`${person.name}: ${person.number}`);
    });
    mongoose.connection.close();
  });
}
