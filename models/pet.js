const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PetSchema = new Schema({
  name: String,
  color: String,
  age: Number,
  type: String,
  weight: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Owner"
  }
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;