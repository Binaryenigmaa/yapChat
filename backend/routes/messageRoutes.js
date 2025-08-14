import express from "express";
import { isUserLoggedIn } from "../middleware/authMiddleware.js";
import {
  fetchMessages,
  getSidebarUsers,
  sendMessage,
  // searchUser,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", isUserLoggedIn, getSidebarUsers);
messageRouter.get("/:id", isUserLoggedIn, fetchMessages);
messageRouter.post("/send/:id", isUserLoggedIn, sendMessage);
// messageRouter.get("/search", isUserLoggedIn, searchUser);

export default messageRouter;
