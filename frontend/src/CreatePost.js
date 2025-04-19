import React, { useEffect, useState } from "react";
import axios from "axios";

function CreatePost() {
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        file: null,
    });

    useEffect(() => {
        // Set a test userId in localStorage
        localStorage.setItem('userId', '1234567890abcdef12345678'); // Example userId
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handleFileChange = (event) => {
        setNewPost({ ...newPost, file: event.target.files[0] });
    };

    const handlePostSubmit = () => {
        const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
        const formData = new FormData();
        formData.append("title", newPost.title);
        formData.append("content", newPost.content);
        formData.append("userId", userId); // Include userId in the request
        if (newPost.file) {
            formData.append("file", newPost.file);
        }

        axios
            .post("http://localhost:5000/api/posts", formData)
            .then((response) => {
                console.log("Post created successfully:", response.data);
                setNewPost({ title: "", content: "", file: null }); // Reset the form
            })
            .catch((error) => console.error("Error creating post:", error));
    };

    return (
        <div className="create-post">
            <h2>Create a Post</h2>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={newPost.title}
                onChange={handleInputChange}
            />
            <textarea
                name="content"
                placeholder="Content"
                value={newPost.content}
                onChange={handleInputChange}
            ></textarea>
            <input type="file" name="file" onChange={handleFileChange} />
            <button onClick={handlePostSubmit}>Post</button>
        </div>
    );
}

export default CreatePost;