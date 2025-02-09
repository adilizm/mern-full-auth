const express = require("express");
const { postsList, createPost, getPost, updatePost, deletePost, ConnectedUserPosts } = require("../controllers/post");
const auth = require("../middlewares/auth");
const { multerUpload } = require("../config/multer");

const postsRouter = express.Router();

postsRouter.get("/", postsList);
postsRouter.get("/getmyposts",auth, ConnectedUserPosts);
postsRouter.post("/new", auth, multerUpload.single("image"), createPost);
postsRouter.get("/:slug", getPost);
postsRouter.put("/update/:slug", auth,multerUpload.single("new_image"), updatePost);
postsRouter.delete("/delete/:slug", auth, deletePost);

module.exports = postsRouter;