import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { dirname } from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import subscriberouter from "./routes/newsletter.route.js";
import contactRouter from "./routes/contact.route.js";

import { postRouterUpload, postRouter } from "./routes/post.route.js";

import cookieParser from "cookie-parser";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cookieParser());

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (process.env.ALLOWED_ORIGINS) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

app.use((req, res, next) => {
  req.upload = upload;
  next();
});

app.use("/api/auth", authRouter);
app.use("/api", contactRouter);
app.use("/api", subscriberouter);
app.use("/api/post", postRouter);
app.use("/api/post/upload", upload.single("file"), postRouterUpload);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use("/", async (req, res) => {
  try {
    res.json("Hello from server !!");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${process.env.PORT}!`));
