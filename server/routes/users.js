const bcrypt = require("bcryptjs");

const pool = require("../config/db-config");

const remove = async (req, res) => {
  try {
    const userId = req.params.id;
    const query = "DELETE FROM users WHERE id = $1";
    const values = [userId];

    await pool.query(query, values);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const result = await pool.query(query);

    res.status(200).json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields are required." });

      return;
    }

    const query = "SELECT * FROM users WHERE email = $1";

    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found." });

      return;
    }

    const user = result.rows[0];

    if (user.password !== password) {
      res.status(401).json({ message: "Invalid credentials." });

      return;
    }

    res.status(200).json({ message: "User logged in successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

module.exports = { getAll, login, register, remove };
