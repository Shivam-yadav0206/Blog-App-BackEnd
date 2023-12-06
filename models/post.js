import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    maxLength: 20,
  },
  description: {
    type: String,
    required: true,
    maxLength: 100,
  },
  content: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
  },
});

const post = mongoose.model("post", postSchema);
export default post;
