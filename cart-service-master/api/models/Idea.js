const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const ideaSchema = new mongoose.Schema({
  _id: { type: ObjectId, required: true },
  idea_owner: String,
  idea_owner_name: String,
  idea_genre: String,
  idea_headline: String,
  idea_description: String,
  price: Number,
});

module.exports = mongoose.model("Idea", ideaSchema);
