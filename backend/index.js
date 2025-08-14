import express from "express";
import { config } from "dotenv";
import authRouter from "./routes/authRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { connectDb } from "./utils/dbConnect.js";
import cookieparser from "cookie-parser";
import cors from "cors";
import { app, server, io } from "./utils/socket.js";
import path from "path";

// CONFIGURATION
config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ROUTING
/*app.get("/", (req, res) => {
  res.status(200).json({ message: `Server running at port: ${PORT} ` });
});
 */
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server Running at port: ${PORT}`);
  connectDb();
});
