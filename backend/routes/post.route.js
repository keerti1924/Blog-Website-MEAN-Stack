import express from "express";
import {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

export const postRouter = express.Router();
export const postRouterUpload = express.Router();

postRouterUpload.post("/create", verifyToken, createPost);
postRouterUpload.patch("/update/:id", verifyToken, updatePost);
postRouter.delete("/:id", verifyToken, deletePost);
postRouter.get("/", (req, res) => {
  getAllPost(req, res);
});
postRouter.get("/:id", getSinglePost);
