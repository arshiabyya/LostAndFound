// Home.js

import React, { useState, useEffect } from "react";
import axios from "axios";
localStorage.setItem('userId', '1234567890abcdef12345678'); // Example userId

function Home() {
	const [commentInput, setCommentInput] = useState("");
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/posts")
			.then((response) => setPosts(response.data))
			.catch((error) => console.error("Error fetching posts:", error));
	}, []);

	

	const handleLike = (postId) => {
		axios
			.post(`http://localhost:5000/api/posts/like/${postId}`)
			.then((response) => {
				const updatedPosts = posts.map((post) =>
					post._id === postId ? response.data : post
				);
				setPosts(updatedPosts);
			})
			.catch((error) => console.error("Error liking post:", error));
	};

	const handleAddComment = (postId, commentText) => {
		axios
			.post(`http://localhost:5000/api/posts/comment/${postId}`, {
				text: commentText,
			})
			.then((response) => {
				const updatedPosts = posts.map((post) =>
					post._id === postId ? response.data : post
				);
				setPosts(updatedPosts);

				//This should clear the input after the comment is posted. 
				setCommentInput('');  
			})
			.catch((error) => console.error("Error adding comment:", error));
	};

	const deletePost = (postId) => {
		const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
		console.log(`Attempting to delete post with ID: ${postId} by user: ${userId}`); // Debug log
	
		axios.delete(`http://localhost:5000/api/posts/${postId}`, {
			data: { userId }, // Send userId in the request body
		})
		.then(() => {
			console.log(`Post with ID: ${postId} deleted successfully`);
			setPosts(posts.filter((post) => post._id !== postId)); // Remove the post from the UI
		})
		.catch((error) => console.error('Error deleting post:', error));
	};

	const [filterCategory, setFilterCategory] = useState("");

	const handleFilterChange = (event) => {
		setFilterCategory(event.target.value);
	};

	const filteredPosts = filterCategory
		? posts.filter((post) => post.category === filterCategory)
		: posts;

	return (
		<div className="home">
			<h2>Recent Posts</h2>
			<select
				onChange={handleFilterChange}
				value={filterCategory}
				className="filter-container"
				>
				<option value="">All Categories</option>
				<option value="Electronics">Electronics</option>
				<option value="Sports">Sports</option>
				<option value="School">School</option>
				<option value="Miscellaneous">Miscellaneous</option>
			</select>
			<ul>
				{filteredPosts.map((post) => (
					<div key={post._id} className="post">
						<h3>{post.title}</h3>
						<p>{post.content}</p>
						<p>Category: {post.category}</p>
						<button onClick={() => deletePost(post._id)}>Delete</button>
						{post.file && (
							<div>
								{post.file.includes(".mp4") ? (
									<video width="320" height="240" controls>
										<source
											src={`http://localhost:5000/uploads/${post.file}`}
											type="video/mp4"
										/>
										Your browser does not support the video tag.
									</video>
								) : (
									<img
										src={`http://localhost:5000/uploads/${post.file}`}
										alt="Post Media"
									/>
								)}
							</div>
						)}
						<p>Likes: {post.likes}</p>
						<button onClick={() => handleLike(post._id)}>Like</button>
						<p>Comments: {post.comments.length}</p>
						<ul>
							{post.comments.map((comment, index) => (
								<li key={index}>{comment.text}</li>
							))}
						</ul>

						<input
							type="text"
							placeholder="Add a comment"
							className="comment-input"
							value={commentInput}
							onChange={(e) => setCommentInput(e.target.value)}
						/>
						<button
							onClick={() => handleAddComment(post._id, commentInput)}
							className="comment-button"
						>
							Add Comment
						</button>
					</div>
				))}
			</ul>
		</div>
	);
}

export default Home;