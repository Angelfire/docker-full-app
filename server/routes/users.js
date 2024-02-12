const pool = require("../config/db-config");

const getUsers = async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const result = await pool.query(query);
    res.status(200).json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const query = `INSERT INTO users (username, password, email) VALUES ($1, $2, $3)`;
    const values = [username, password, email];

    await pool.query(query, values);

    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
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

module.exports = { addUser, deleteUser, getUsers };
