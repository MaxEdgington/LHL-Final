DROP TABLE IF EXISTS columns CASCADE;

CREATE TABLE columns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) -- this assumes that each column is related to a user
  -- Other fields go here...
  
);