import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB connect successfully");
  });
  await mongoose.connect("mongodb://127.0.0.1:27017/spotifyApp");
};

export default connectDB;
