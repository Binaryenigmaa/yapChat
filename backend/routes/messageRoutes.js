import express from "express";
import { isUserLoggedIn } from "../middleware/authMiddleware";
import {
  fetchMessages,
  getSidebarUsers,
  sendMessage,
} from "../controllers/messageController";

const messageRouter = express.Router();

messageRouter.get("/users", isUserLoggedIn, getSidebarUsers);
messageRouter.get("/:id", isUserLoggedIn, fetchMessages);
messageRouter.post("/send/:id", isUserLoggedIn, sendMessage);

export default messageRouter;
