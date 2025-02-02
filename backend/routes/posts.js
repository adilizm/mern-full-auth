const express = require("express");
const { postsList, createPost, getPost, updatePost, deletePost } = require("../controllers/post");
const auth = require("../middlewares/auth");

const postsRouter = express.Router();

postsRouter.get("/", postsList);
postsRouter.post("/new", auth, createPost);
postsRouter.get("/:slug", getPost);
postsRouter.put("/update/:slug", auth, updatePost);
postsRouter.delete("/delete/:slug", auth, deletePost);

module.exports = postsRouter;