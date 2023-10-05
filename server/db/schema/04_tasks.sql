DROP TABLE IF EXISTS tasks CASCADE;
DROP TYPE IF EXISTS status;

-- CREATE TASKS
CREATE TYPE status AS ENUM ('1', '2', '3', '4');

-- Mapping for clarity:
-- 1: To Do
-- 2: In Progress
-- 3: In Review
-- 4: Complete

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description text,
  due_date Date,
  status status DEFAULT '1'::status, -- Default to 'To Do'
  project_id INT REFERENCES projects(id) NOT NULL,
  assigned_user INT REFERENCES users(id)
);

