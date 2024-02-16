const pool = require("../config/db-config");

const { sanitize } = require("../utils/sanitize");

const getAllPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await pool.query("SELECT * FROM posts WHERE user_id = $1", [
      userId,
    ]);

    if (posts.rowCount === 0) {
      return res.status(404).json({ error: "No posts found" });
    }

    if (posts.rowCount > 0) {
      return res.status(200).json(posts.rows);
    }
  } catch (error) {
    console.error("Error getting all posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sanitizedTitle = sanitize(title);
    const sanitizedContent = sanitize(content);

    const newPost = await pool.query(
      "INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [sanitizedTitle, sanitizedContent, userId]
    );

    if (newPost.rowCount === 0) {
      return res.status(500).json({ error: "Error creating post" });
    }

    if (newPost.rowCount === 1) {
      return res
        .status(201)
        .json({ message: "The post has been created successfully" });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id, userId } = req.params;

    // Check if the post exists and if the user is the owner of the post
    const postCheck = await pool.query(
      "SELECT * FROM posts WHERE id = $1 and user_id = $2",
      [id, userId]
    );

    if (postCheck.rowCount === 0) {
      return res.status(403).json({
        error: "Unauthorized: You cannot delete posts from other users.",
      });
    }

    const deletePost = await pool.query(
      "DELETE FROM posts WHERE id = $1 and user_id = $2 RETURNING *",
      [id, userId]
    );

    if (deletePost.rowCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (deletePost.rowCount === 1) {
      return res
        .status(200)
        .json({ message: `Post with ID ${id} deleted successfully` });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { create, deletePost, getAllPosts };
