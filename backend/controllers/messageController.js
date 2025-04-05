import Message from "../models/messageModel";
import User from "../models/userModel";
import cloudinary from "../utils/cloudinary";

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
        { receiverId: chatteeId, senderId: chatterId },
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

    if (imgUrl) {
      const cloudinaryResponse = await cloudinary.uploader.upload(image);
      imgUrl = cloudinaryResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imgUrl,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Error in sendMessage`, error);
    res.status(500).json({ message: `Internal Server Issue` });
  }
};
