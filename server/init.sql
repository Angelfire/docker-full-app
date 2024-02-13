DROP TABLE IF EXISTS users;

-- id SERIAL PRIMARY KEY is not safe for production use because it can be easily guessed.
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);
