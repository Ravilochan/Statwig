const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Idea = require("./models/Idea");
const MONGOURI =
  "mongodb+srv://Admin:K2EVDutkj9V2Lam8@collaboratofav-7rukn.mongodb.net/CartDb?retryWrites=true&w=majority";
const PORT = process.env.PORT || 7000;
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", () => {
  console.log("Error Connecting to the MongoDb");
});

app.put("/api/cart", (req, res) => {
  console.log("CART SERVICE : " +req.body.cart._id + " " + req.body.cart.idea_owner + " " + req.body.cart.idea_owner_name + " " +req.body.cart.idea_genre + " " +
        req.body.cart.idea_headline + " " +req.body.cart.idea_description + " " +req.body.cart.price + " " +req.body.user._id);
  const idea = new Idea({
    _id: mongoose.Types.ObjectId(req.body.cart._id),
    idea_owner: req.body.cart.idea_owner,
    idea_owner_name: req.body.cart.idea_owner_name,
    idea_genre: req.body.cart.idea_genre,
    idea_headline: req.body.cart.idea_headline,
    idea_description: req.body.cart.idea_description,
    price: req.body.cart.price,
  });
  idea
    .save()
    .then()
    .catch((err) => {
      console.log(err);
    });
  User.findByIdAndUpdate(
    req.body.user._id,
    {
      $push: { cart: req.body.cart._id },
    },
    {
      new: true,
    }
  ).then((user) => {
    if (user) {
      return res.json(user);
    } else {
      const user = new User({
        _id: req.body.user._id,
      });
      user
        .save()
        .then(() => {
          User.findByIdAndUpdate(
            req.body.user._id,
            {
              $push: { cart: req.body.cart._id },
            },
            {
              new: true,
            }
          ).then((user) => {
            return res.json(user);
          });
        })
        .catch((err) => console.log(err));
    }
  });
});

app.get("/api/cart/:_id", (req, res) => {
  User.find({ _id: req.params._id })
    .populate(
      "cart",
      "_id idea_owner idea_owner_name idea_genre idea_headline idea_description price"
    )
    .then((items) => {
      var uniqueArray = [...new Set(items[0].cart)];
      return res.json(uniqueArray);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/api/uncart", (req, res) => {
  User.findByIdAndUpdate(
    req.body.user._id,
    {
      $pull: { cart: req.body.cart._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.json({ error: err });
    } else {
      res.json(result);
    }
  });
});

app.get("/api/clearcart/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: { cart: [] },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.json({ error: err });
    } else {
      res.json(result);
    }
  });
});

app.listen(PORT, () =>
  console.log(`Server Started at : http://localhost:${PORT}`)
);
