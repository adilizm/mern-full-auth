const { generateUniqueSlug } = require("../helpers/slugify");
const Post = require("../models/Post")

const postsList = async (req, res) => {
    try {
        const posts = await Post.find().populate({
            path: 'owner',
            select: 'username profile '
          });
        res.status(201).json({ success: true, posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getPost = async (req, res) => {
    try {
        const slug  = req.params.slug;
        const post = await Post.find({ slug }).populate({
            path: 'owner',
            select: 'username profile '
          });
        if (!post) {
            res.status(404).json({ success: true, message: "Not found" });
        }
        res.status(201).json({ success: true, data: post })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const slug = await generateUniqueSlug(title);
        const post = new Post({ title, content, slug, owner: req.user_id });
        post.save();
        res.status(201).json({ success: true, message: "post created" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

const updatePost = async (req,res) =>{
    try {
        const slug  = req.params.slug;
        
        let post = await Post.findOne({ slug });
        if (!post) {
            res.status(404).json({ success: true, message: "Not found" });
        }

        const {  new_content } = req.body;
        if(!new_content){
            res.status(400).json({ success: false, message: "content cannot be empty" });
        }

        post.content = new_content;
        await post.save();
        res.status(201).json({ success: true, message:"updated" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    } 
}


const deletePost = async (req,res) =>{
    try {
        const slug  = req.params.slug;
        const post = await Post.findOneAndDelete({ slug });
        res.status(201).json({ success: true, message:"deleted" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


module.exports = { postsList, getPost, createPost,updatePost,deletePost }