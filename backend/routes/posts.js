import express from "express";
import { postsList, createPost, getPost, updatePost, deletePost, ConnectedUserPosts } from "../controllers/post.js";
import {auth} from "../middlewares/auth.js";
import { multerUpload } from "../config/multer.js";

const postsRouter = express.Router();

postsRouter.get("/", postsList);
postsRouter.get("/getmyposts",auth, ConnectedUserPosts);
postsRouter.post("/new", auth, multerUpload.single("image"), createPost);
postsRouter.get("/:slug", getPost);
postsRouter.put("/update/:slug", auth,multerUpload.single("new_image"), updatePost);
postsRouter.delete("/delete/:slug", auth, deletePost);

export { postsRouter};