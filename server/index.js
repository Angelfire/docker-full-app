const express = require("express");
const cors = require("cors");

const { getAll, login, remove, register } = require("./routes/users");

const app = express();

const PORT = process.env.API_PORT;

// Middleware to parse JSON data in the request body
app.use(express.json());

// Middleware to parse URL-encoded form data in the request body
app.use(express.urlencoded({ extended: true }));

// Middleware to enable CORS
app.use(cors());

// TODO: Check why this is not working
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// }));

app.get("/users", getAll);
app.post("/users/register", register);
app.post("/users/login", login);
app.delete("/users/:id", remove);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
