const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
  name: String,
  age: Number,
  address: String,
  phone: Number,
  pets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pet",
      count: true,
      unique: true
    }
  ]
}, 
{
  toJSON: {
    virtuals: true
  }
});

OwnerSchema.virtual('petCount', {
  ref: 'Pet',
  localField: "pets",
  foreignField: "_id",
  count: true
});


const Owner = mongoose.model("Owner", OwnerSchema);

module.exports = Owner;