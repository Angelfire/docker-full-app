const express = require("express");
const cors = require("cors");

const { getAll, login, remove, register } = require("./routes/users");

const app = express();

const PORT = process.env.API_PORT;
const FRONTEND_URL = process.env.REACT_HOST;

app
  // Middleware to parse JSON data in the request body
  .use(express.json())
  // Middleware to parse URL-encoded form data in the request body
  .use(express.urlencoded({ extended: true }))
  // Middleware to enable CORS
  // if you specify the origin directly as string it does not work
  // but if you specify it as an environment variable it works fine o.O
  .use(
    cors({
      origin: FRONTEND_URL,
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    })
  );

app.get("/users", getAll);
app.post("/users/register", register);
app.post("/users/login", login);
app.delete("/users/:id", remove);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
