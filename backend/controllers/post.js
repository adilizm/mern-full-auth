const { default: mongoose } = require("mongoose");
const { generateUniqueSlug } = require("../helpers/slugify");
const Post = require("../models/Post")
const Joi = require('joi');

const postsList = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({
            path: 'owner',
            select: 'username profile '
        });
        return res.status(201).json({ success: true, posts });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
const ConnectedUserPosts = async (req, res) => {
    try {
      
        const posts = await Post.find({owner: new mongoose.Types.ObjectId(req.user_id+"")}).populate({
            path: 'owner',
            select: 'username profile '
        });
        return res.status(201).json({ success: true, posts });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const getPost = async (req, res) => {
    try {
        const slug = req.params.slug;
        const post = await Post.find({ slug }).populate({
            path: 'owner',
            select: 'username profile '
        });
        if (!post) {
            return res.status(404).json({ success: true, message: "Not found" });
        }
        return res.status(201).json({ success: true, post: post })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}

const createPost = async (req, res) => {
    try {
      
        const postSchema = Joi.object({
            title: Joi.string().min(3).max(255).required(),
            content: Joi.string().min(20).required(),
        });
        
        const { error } = postSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        
        const { title, content , } = req.body;
        const image = req?.file?.path
        const slug = await generateUniqueSlug(title);
        const post = new Post({ title, content,image, slug, owner: req.user_id });
        post.save();
        return res.status(201).json({ success: true, message: "post created" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}

const updatePost = async (req, res) => {
    try {
        const slug = req.params.slug;

        let post = await Post.findOne({ slug });
        if (!post) {
            return res.status(404).json({ success: true, message: "Not found" });
        }

        const postSchema = Joi.object({
            new_title: Joi.string().min(20).required(),
            new_content: Joi.string().min(20).required(),
        });

        const { error } = postSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { new_content,new_title } = req.body;

        const new_slug = await generateUniqueSlug(new_title);

        post.image = req?.file?.path ?? post.image
        post.title = new_title;
        post.slug = new_slug;
        post.content = new_content;
        await post.save();
        return res.status(201).json({ success: true, message: "updated" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const deletePost = async (req, res) => {
    try {
        const slug = req.params.slug;
        const post = await Post.findOneAndDelete({ slug });
        return res.status(201).json({ success: true, message: "deleted" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { postsList, getPost, createPost, updatePost, deletePost,ConnectedUserPosts }