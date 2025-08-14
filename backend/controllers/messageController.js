import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import cloudinary from "../utils/cloudinary.js";
import { getReiverSocketId, io } from "../utils/socket.js";

export const getSidebarUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(`Error in getSidebar`, error);
    res.status(500).json({ message: `Internal Server Error` });
  }
};

export const fetchMessages = async (req, res) => {
  try {
    const { id: chatteeId } = req.params;
    const chatterId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: chatterId, receiverId: chatteeId },
        { senderId: chatteeId, receiverId: chatterId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(`Error in fetchMessages`, error);
    res.status(500).json({ message: `Internal Server Issue` });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imgUrl;

    if (image) {
      const cloudinaryResponse = await cloudinary.uploader.upload(image);
      imgUrl = cloudinaryResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message: text,
      image: imgUrl,
    });

    await newMessage.save();

    //Realtime Message sending using socket.io

    const receiverSocketId = getReiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Error in sendMessage`, error);
    res.status(500).json({ message: `Internal Server Issue` });
  }
};

/* export const searchUser = async (req, res) => {
  try {
    const search = req.query.search || "";
    const currentUserId = req.user._id;
    const user = await User.find({
      $and: [
        { fullname: { $regex: ".*" + search + ".*", $options: "i" } },
        { _id: { $ne: currentUserId } },
      ],
    }).select("-password");

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
    console.log("error");
  }
};
*/
