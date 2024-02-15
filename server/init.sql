DROP TABLE IF EXISTS users;

-- Explore if UUID is better than nanoId for generating unique IDs

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Randomly generated ID
  username VARCHAR(50) UNIQUE NOT NULL,
  password CHAR(60) NOT NULL, -- Hashed and salted password
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Randomly generated ID
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_posts_user_id ON posts(user_id); -- Index for efficient join