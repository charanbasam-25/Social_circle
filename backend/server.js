import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from 'cors';

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import noteRoutes from "./routes/note.route.js";
import notificationRoutes from "./routes/notification.route.js";

import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

console.log(process.env.CLOUDINARY_SECRET_KEY,"")
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const app = express();
// const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" })); // to parse req.body
// // limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use(cookieParser());
app.use(
	cors({
	  origin: "http://localhost:3000", // The URL of your frontend application
	  credentials: true,  // Allow sending cookies with requests
	})
  )
// app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/note", noteRoutes);


// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }
const PORT= process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`);
	connectMongoDB();
});