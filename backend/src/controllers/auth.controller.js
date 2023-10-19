import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";

export default {
  signup: async (req, res) => {
    try {
      const { password, name, email, photo } = req.body;

      if (!password || !email || !name) {
        return res.status(422).json({
          status: 422,
          message: "Fill the all fields",
        });
      }

      const existingUser = await Users.findOne({ email });

      if (existingUser) {
        return res.status(422).json({
          status: 422,
          message: "User already exists, login please!",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new Users({
        name,
        email,
        password: hashedPassword,
        photo,
      });
      await user.save();

      res.status(201).json({
        status: 201,
        token: jwt.sign({ id: user._id }),
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(422).json({
        status: 422,
        message: "Fill the all fields",
      });
    }

    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res.status(422).json({
        status: 422,
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (validPassword) {
      res.status(200).json({
        status: 200,
        token: jwt.sign({ id: existingUser._id }),
        message: "User logged in successfully",
        data: existingUser,
      });
    } else {
      return res.status(422).json({
        status: 422,
        message: "Invalid password",
      });
    }
  },
};
