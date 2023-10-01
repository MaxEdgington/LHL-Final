DROP TABLE IF EXISTS tasks CASCADE;
DROP TYPE IF EXISTS status;

-- CREATE TASKS
CREATE TYPE status AS ENUM ('To Do', 'In Progress', 'In Review', 'Complete');
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description text,
  due_date Date,
  status status  DEFAULT 'To Do',
  project_id INT REFERENCES projects(id) NOT NULL,
  assigned_user INT REFERENCES users(id)
  );