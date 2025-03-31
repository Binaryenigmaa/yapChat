import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import getJwtToken from "../utils/jwtToken.js";
import cloudinary from "../utils/cloudinary.js";

export const signupController = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ message: `All the fields are compulsory!` });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: `password too small must be larger than 6 chars!` });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: `User Already Exists!` });

    // If user doesn't Exist we encrypt the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Next we add the User information Along with **hashed password**
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    if (!newUser)
      return res.status(400).json({ message: `Invalid credentials.` });
    if (newUser) {
      getJwtToken(newUser._id, res);
      newUser.save();
      return res.status(200).json({
        fullname,
        email,
        message: `Account added successfully!`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Server Issue` });
    console.log(`Error in signup:`, error);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: `All fields compulsory!` });
    if (password.length < 6)
      return res.status(400).json({ message: `Password too small` });
    // find the password in db, decode and compare it.
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: `User does not exist!` });
    const decodedPass = bcrypt.compareSync(password, user.password);
    if (!decodedPass)
      return res.status(400).json({ message: `Wrong password` });
    getJwtToken(user._id, res);
    return res.status(200).json({
      fullname: user.fullname,
      email: user.email,
      message: `Login Successful`,
    });
  } catch (error) {
    console.log(`Login error`, error);
    res.status(500).json({ message: `Server Issue. Couldn't login` });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: `Logout Successful!` });
  } catch (error) {
    console.log(`error in logoutController`, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const profileUpdateController = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userId = req.user._id;

    if (!profilepic)
      return res.status(400).json({ message: `Profile pic is required!` });

    const cloudinaryResponse = await cloudinary.uploader.upload(profilepic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilepic: cloudinaryResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(`Error in profileUpdateController:`, error);
    res.status(500).json({ message: `Internal Server error!` });
  }
};
