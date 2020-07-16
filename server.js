const mongoose = require("mongoose");
const express = require("express");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/petsAndOwners", { useNewUrlParser: true });

const db = require("./models");
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// route to get all owners
app.get("/owners", (req, res) => {
  db.Owner.find({})
    .lean()
    .then(owners =>{
      return res.render("owners", { owners });
    })
});

// route to assign pets to owners
app.get("/assign", async (req, res) => {
  const owners = await db.Owner.find({}).select("_id name").lean();
  const pets = await db.Pet.find({}).select("_id name").lean();
  res.render("assign", { owners, pets });
});

// route to get all owners
app.get("/api/owners", (req, res) => {
  db.Owner.find({}).then(results => {
    return res.json(results);
  });
});
// route to get all owners with pets
app.get("/api/owners/with/pets", (req, res) => {
  db.Owner.find({})
    // grabs only the name field (similar to SELECT name FROM 'owners')
    .select("name -_id")
    // populates the owners pets collection with also only grabbing the name 
    .populate([
      { 
        // field (SELECT name FROM 'pets')
        path: "pets", 
        select: "name -_id",
      }, 
      {
        // virtual field (see Owner model for details)
        // (SELECT petCount FROM 'owners')
        path:"petCount"
      }
    ])
    // formats the results as plain JavaScript objects
    .lean()
    .then(results => {
      // only shows owners who have at least one pet ( WHERE 'petCount' > 0)
      const owners = results.filter(o => o.petCount);
      return res.json(owners);
    });
});

app.get("/owners/with/pets", (req, res) => {
  db.Owner.find({})
    .populate('pets')
    .populate('petCount')
    .lean()
    .then(results => {
      const owners = results.filter(o => o.petCount);
      return res.render("index", { owners });
    });
});

app.post("/give/pet/to/owner", ({ body: { pet, owner }}, res) => {
  db.Pet.findOne({ _id: pet })
    .then(({ _id }) => {
      db.Owner.findByIdAndUpdate(owner, { $push: { pets: _id }}, { new: true })
      .then(result => {
        res.redirect('/assign');
      }).catch(err => {
        console.log("Catch", err);
      })
    });
});


app.listen(PORT, function() {
  console.log("successfully connected http://localhost:%s", PORT);
});