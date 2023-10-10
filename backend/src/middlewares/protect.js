import jwt from "../utils/jwt.js";
import Users from "../models/Users.js";

const protect = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findById(decoded.id);
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default protect;
