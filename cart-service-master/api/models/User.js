const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: ObjectId,
      ref: "Idea",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
