const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    postId: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: String,
    body: { type: String, require: true },
});

const model = mongoose.model("Comment", CommentSchema, "comments");

module.exports = model;