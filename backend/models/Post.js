// models/Post.js

// filepath: c:\Users\arani\social_backend\backend\models\Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    file: String,
    username:String,//just added this
    likes: { type: Number, default: 0 },
    comments: [{ text: String }],
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt` fields

const Post = mongoose.model('Post', postSchema); //Comment out this line if it causes issues.

module.exports = mongoose.model('Post', postSchema);