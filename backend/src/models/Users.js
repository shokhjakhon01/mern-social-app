import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [
    {
      type: ObjectId,
      ref: "User",
    }
  ],
  following: [
    {
      type: ObjectId,
      ref: "User",
    }
  ]
});

const User = model("Users", UserSchema);

export default User;
