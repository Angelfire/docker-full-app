import bcrypt from "bcryptjs";

import { pool } from "../config/db-config.js";

import { generateAccessToken } from "../middlewares/jwt-auth.js";

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const query = "DELETE FROM users WHERE id = $1";
    const values = [userId];

    await pool.query(query, values);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const result = await pool.query(query);

    res.status(200).json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      res.status(400).json({ message: "All fields are required." });

      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `INSERT INTO users (username, password, email) VALUES ($1, $2, $3)`;
    const values = [username, hashedPassword, email];

    await pool.query(query, values);

    res
      .status(200)
      .json({ message: `User ${email} has been created successfully.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// TODO: Validate that 2 users cannot have the same email address
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const query = "SELECT * FROM users WHERE email = $1";

    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = result.rows[0];
    const verifiedPassword = await bcrypt.compare(password, user.password);

    if (!verifiedPassword) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: generateAccessToken(user, 3600),
        expiresIn: 3600, // 1 hour
      },
    });
  } catch (error) {
    // Handle unexpected errors
    console.error(error); // Log for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
};

// TODO: Implement the logout function to remove the user's token from the database and log the user out
const logout = (req, res) => {
  try {
    const userId = req.params.id;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
