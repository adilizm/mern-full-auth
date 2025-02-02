const slugify = require("slugify");
const Post = require("../models/Post");


async function generateUniqueSlug(title) {
    let slug = slugify(title, { lower: true, strict: true });
    let uniqueSlug = slug;
    let count = 1;
    
    while (await Post.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${slug}-${count}`;
        count++;
    }
    return uniqueSlug;
}

module.exports = { generateUniqueSlug }