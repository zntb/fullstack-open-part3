const mongoose = require('mongoose');

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://zntb:${password}@opencourse.dp4llgl.mongodb.net/phonebook-app?retryWrites=true&w=majority&appName=opencourse`;

mongoose.set('strictQuery', false);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');

    if (!name && !number) {
      return listAllEntries();
    } else if (name && number) {
      return addEntry(name, number);
    } else {
      console.log('Please provide both name and number to add an entry.');
      mongoose.connection.close();
    }
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

function addEntry(name, number) {
  const person = new Person({
    name,
    number,
  });

  return person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    return listAllEntries();
  });
}

function listAllEntries() {
  return Person.find({}).then((persons) => {
    console.log('phonebook:');
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
