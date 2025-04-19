// models/Post.js

// filepath: c:\Users\arani\social_backend\backend\models\Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    file: String,
    likes: { type: Number, default: 0 },
    comments: [{ text: String }],
    category: { type: String, required: true }, // Ensure this field exists
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);