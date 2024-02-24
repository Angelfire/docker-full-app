import express from "express";
import cors from "cors";

import { verifyToken } from "./middlewares/jwt-auth.js";

import { deleteUser, getAll, login, register } from "./routes/users.js";
import { create, deletePost, getAllPosts } from "./routes/posts.js";

const app = express();
const PORT = process.env.API_PORT;
const CLIENT_HOSTNAME = process.env.CLIENT_HOSTNAME;

// Middleware to parse JSON data in the request body
app.use(express.json());

// Middleware to parse URL-encoded form data in the request body
app.use(express.urlencoded({ extended: true }));

// Middleware to enable CORS
// if you specify the origin directly as string it does not work
// but if you specify it as an environment variable it works fine o.O
app.use(
  cors({
    origin: CLIENT_HOSTNAME,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  })
);

app.get("/users", getAll);
app.post("/users/register", register);
app.post("/users/login", login);
app.delete("/users/:userId", deleteUser);

app.get("/posts", verifyToken, getAllPosts);
app.post("/posts/create", verifyToken, create);
app.delete("/posts/:postId", verifyToken, deletePost);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
