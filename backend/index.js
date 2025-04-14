import express from "express";
import { config } from "dotenv";
import authRouter from "./routes/authRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { connectDb } from "./utils/dbConnect.js";
import cookieparser from "cookie-parser";
import cors from "cors";

// CONFIGURATION
config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ROUTING
app.get("/", (req, res) => {
  res.status(200).json({ message: `Server running at port: ${PORT} ` });
});

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.listen(PORT, () => {
  console.log(`Server Running at port: ${PORT}`);
  connectDb();
});
