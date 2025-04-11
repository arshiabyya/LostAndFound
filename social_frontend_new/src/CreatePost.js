// CreatePost.js
import React, { useState } from "react";
import axios from "axios";

function CreatePost() {
	const [newPost, setNewPost] = useState({
		title: "",
		content: "",
		file: null,
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewPost({ ...newPost, [name]: value });
	};

	const handleFileChange = (event) => {
		setNewPost({ ...newPost, file: event.target.files[0] });
	};

	const handlePostSubmit = () => {
		const formData = new FormData();
		formData.append("title", newPost.title);
		formData.append("content", newPost.content);
		formData.append("file", newPost.file);

		axios
			.post("http://localhost:5000/api/posts", formData)
			.then((response) => {
				setNewPost({ title: "", content: "", file: null });
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
