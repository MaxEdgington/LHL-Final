DROP TABLE IF EXISTS projects CASCADE;
-- CREATE PROJECTS
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description text NOT NULL,
  due_date Date NOT NULL,
  owner_id INT REFERENCES users(id) NOT NULL
  );