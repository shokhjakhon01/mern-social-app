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
  photo: {
    type: String,
    default: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
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
