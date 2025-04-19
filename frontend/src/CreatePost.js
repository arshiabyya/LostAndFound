import React, { useEffect, useState } from "react";
import axios from "axios";

function CreatePost() {
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
		category: {
			type: String,
			enum: ['Electronics', 'Sports', 'School', 'Miscellaneous'],
			required: true,
		},
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
		formData.append("category", newPost.category); // Include category in the request
		if (newPost.file) {
			formData.append("file", newPost.file);
		}
	
		axios
			.post("http://localhost:5000/api/posts", formData)
			.then((response) => {
				console.log("Post created successfully:", response.data);
				setNewPost({ title: "", content: "", file: null, category: "" }); // Reset the form
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
			<select
                name="category"
                value={newPost.category}
            	onChange={handleInputChange}
        	>
			<option value="">Select a Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Sports">Sports</option>
            <option value="School">School</option>
            <option value="Miscellaneous">Miscellaneous</option>
        </select>
        <input type="file" name="file" onChange={handleFileChange} />
        <button onClick={handlePostSubmit}>Post</button>
    </div>
    );
}

export default CreatePost;