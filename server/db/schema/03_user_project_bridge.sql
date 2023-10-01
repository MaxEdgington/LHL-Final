DROP TABLE IF EXISTS user_project_bridge CASCADE;
-- CREATE BRIDGE TABLE
CREATE TABLE user_project_bridge (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  project_id INT REFERENCES projects(id) NOT NULL
  );

  -- do the reference collumns need ON DELETE CASCADE ?