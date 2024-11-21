const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  pseudo: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

let users = mongoose.model("User", userSchema);

module.exports = users;
