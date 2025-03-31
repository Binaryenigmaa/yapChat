import mongoose from "mongoose";
import { config } from "dotenv";

config();
export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.uri);
    console.log(
      connection ? `Db connected Successfully!` : `Couldn't connect to db`
    );
  } catch (error) {
    console.log(`Couldn't connect to mongoDb`);
  }
};
