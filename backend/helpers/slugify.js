import slugify from "slugify";
import {Post} from "../models/Post.js";


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

export { generateUniqueSlug }