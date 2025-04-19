const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    file: String,
    likes: { type: Number, default: 0 },
    comments: [{ text: String }],
    category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);