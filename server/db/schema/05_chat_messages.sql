DROP TABLE IF EXISTS chat_messages CASCADE;
-- CREATE chat_messages TABLE
CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  message VARCHAR(255),
  timestamp timestamp,
  user_id INT REFERENCES users(id),
  project_id INT REFERENCES projects(id)
  );