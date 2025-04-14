import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const isUserLoggedIn = async (req, res, next) => {
  // checking if the user is logged in while performing requests
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(400)
        .json({ message: `Unauthorized. Token not found!` });
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken)
      return res.status(400).json({ message: `Invalid Token` });
    const user = await User.findById(decodedToken.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.log(`error in isUserLogin`, error);
    res.status(500).json({ message: `Internal Server Issue` });
  }
};
