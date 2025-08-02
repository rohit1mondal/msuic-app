import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";
import userRouter from "./src/routes/userRoute.js";
import cookieParser from "cookie-parser";
//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// CORS
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

//routes
app.use("/api/user", userRouter);
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

app.use("/uploads", express.static("uploads"));

//api routes
app.get("/", (req, res) => res.send("API is working"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
