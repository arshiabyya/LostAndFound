const mongoose = require('mongoose');
const Post = require('./models/Post');

mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const test = async () => {
    try {
        const p = new Post({ title: 'Test', content: 'This is a test' });
        await p.save();
        console.log('Saved post:', p);
        mongoose.connection.close();
    } catch (err) {
        console.error('Error saving post:', err);
        mongoose.connection.close();
    }
};

test();
