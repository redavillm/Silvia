const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    body: {type:String, required: true},
});

const model = mongoose.model("Post", PostSchema, "posts");

module.exports = model;