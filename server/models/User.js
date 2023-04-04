const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CompanySchema = new Schema({
  name: String,
  catchPhrase: String,
  bs: String,
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: Number,
      lng: Number,
    },
  },
  phone: String,
  website: String,
  company: CompanySchema,
});

const model = mongoose.model("User", UserSchema, "users");

module.exports = model;