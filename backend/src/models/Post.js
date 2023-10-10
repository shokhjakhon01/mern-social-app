import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  likes: [
    {
      type: ObjectId,
      ref: "users",
    }
  ],
  postedBy: {
    type: ObjectId,
    ref: "Users",
    required: true,
  },
});

const Post = model("Post", PostSchema);

export default Post;
