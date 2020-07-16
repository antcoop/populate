const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/petsAndOwners", { useNewUrlParser: true });


const db = require("../models");
let count = 0;
db.Owner.remove({}).then(() => {
db.Owner.insertMany([
  {
    name: "Morgan",
    age: 19,
    address: "Whoville",
    phone: 1234567890
  },
  {
    name: "Lex",
    age: 19,
    address: "Overthere",
    phone: 1357924680
  },
  {
    name: "Ant",
    age: 19,
    address: "Der",
    phone: 3578906421
  },
  {
    name: "Jess",
    age: 19,
    address: "Whoville",
    phone: 1234567890
  },
  {
    name: "Joe",
    age: 38,
    address: "Whereville",
    phone: 1987654321
  },
  {
    name: "Grigore",
    age: 21,
    address: "There",
    phone: 2468013579
  }
]).then(result => {
  console.log("successfully added owners");
  count++;
  if (count === 2) {
    process.exit();
  }
});
});

db.Pet.remove({}).then(() => {
db.Pet.insertMany([
  {
    name: "Roy",
    color: "blue",
    age: 2,
    type: "Dog",
    weight: 60
  },
  {
    name: "Skywalker",
    color: "blonde",
    age: 3,
    type: "Dog",
    weight: 50
  },
  {
    name: "Franklin",
    color: "black",
    age: 3,
    weight: 10,
    type: "Cat"
  }
]).then(result => {
  console.log("successfully added pets");
  count++;
  if (count === 2) {
    process.exit();
  }
});
});