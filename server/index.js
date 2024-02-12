const express = require("express");

const { addUser, deleteUser, getUsers } = require("./routes/users");

const app = express();

const PORT = process.env.API_PORT;

// Middleware to parse JSON data in the request body
app.use(express.json());

// Middleware to parse URL-encoded form data in the request body
app.use(express.urlencoded({ extended: true }));

app.get("/users", getUsers);
app.post("/users", addUser);
app.delete("/users/:id", deleteUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
