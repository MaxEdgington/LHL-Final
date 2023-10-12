-- with project ID and assigned_user

--tasks for twitter for cats
INSERT INTO tasks (name, description, due_date, status, index, project_id, assigned_user)
VALUES
  ('Project Planning and Ideation', 'Define project objectives, create a timeline, and brainstorm unique features.', '2023-10-12', '4', 2, 1, NULL),
  ('Market Research', 'Research pet and cat-related social media platforms for insights and opportunities.', '2023-11-12', '4', 3, 1, 2),
  ('Technology Stack Selection', 'Choose front-end and back-end technologies, including programming languages and databases.', '2023-12-12', '2', 0, 1, 3),
  ('UI/UX Design', 'Create wireframes, mockups, and a visually appealing cat-themed interface.', '2023-12-13', '2', 1, 1, 1),
  ('Front-End Development', 'Develop the front-end using HTML, CSS, and JavaScript with relevant frameworks.', '2023-12-14', '3', 0, 1, 4),
  ('Back-End Development', 'Build server-side logic, implement authentication, and create APIs for key features.', '2023-12-15', '3', 1, 1, 6),
  ('Database Setup and Management', 'Design the database schema, set up the database server, and implement queries.', '2023-12-16', '3', 2, 1, 5),
  ('Testing, Deployment, and Monitoring', 'Test for bugs, deploy to a web server, and set up monitoring for performance.', '2023-12-17', '4', 1, 1, 7),
  ('Content Creation', 'Generate and optimize text, images, and other media for the website pages.', '2023-12-16', '1', 2, 1, 3),
  ('User Registration and Login System', 'Implement user registration and login functionality with secure authentication.', '2023-12-21', '2', 2, 1, 1),
  ('E-commerce Functionality', 'Add e-commerce features, such as product listings and shopping cart functionality.', '2023-12-23', '1', 4, 1, 2),
  ('Mobile Responsiveness', 'Ensure the website is responsive and functions well on mobile devices.', '2023-12-25', '3', 2, 1, 4),
  ('Security Audit', 'Conduct a security audit to identify and address potential vulnerabilities and threats.', '2023-12-26', '1', 5, 1, 7),
  ('Performance Optimization', 'Optimize the website performance for faster loading and improved user experience.', '2023-12-27', '1', 6, 1, 5);

--tasks for owne wilson fan club
INSERT INTO tasks (name, description, due_date, status, index, project_id, assigned_user)
VALUES
  ('API Integration', 'Connect to the Owen Wilson WOW API and retrieve sample data to display on the website.', '2023-10-15', '1', 1, 7, 4),
  ('Website Design', 'Create a visually appealing design for the fan club website, incorporating Owen Wilson-related elements.', '2023-10-20', '4', 1, 7, 3),
  ('User Registration and Login', 'Implement a user registration and login system to manage member accounts.', '2023-10-25', '1', 2, 7, 4),
  ('WOW API Data Display', 'Design and develop web pages to showcase Owen Wilson-related data fetched from the API.', '2023-11-05', '2', 1, 7, 3),
  ('Discussion Forum', 'Create a space for fan club members to discuss Owen Wilson, his movies, and more.', '2023-11-10', '2', 2, 7, 3),
  ('Content Management', 'Implement a system for administrators to add, edit, and manage content on the website.', '2023-11-15', '2', 3, 7, 7);

--tasks for LHL Final
INSERT INTO tasks (name, description, due_date, status, index, project_id, assigned_user)
VALUES
('ERD design', 'Database design with postgreSQL', '2023-10-15', '1', 1,2, 1);

--tasks for Yes No Toaster
  INSERT INTO tasks (name, description, due_date, status, index, project_id, assigned_user)
VALUES
  ('Gather Breakfast Options', 'Create a list of breakfast options/suggestions.', '2023-10-15', '4', 1, 6, NULL),
  ('Set Breakfast Goals', 'Determine a users nutritional and taste preferences for breakfast.', '2023-10-16', '2', 2, 6, NULL),
  ('Check Inventory Function', 'To verify if you have all the necessary ingredients for your preferred breakfast choices.', '2023-10-17', '2', 3, 6, NULL),
  ('Healthy Options Research', 'Research and compile a list of healthy breakfast recipes.', '2023-10-18', '4', 4, 6, NULL),
  ('Quick & Easy Options Research', 'Categorize quick and easy breakfast options for busy mornings.', '2023-10-19', '1', 5, 6, NULL),
  ('Calculate Nutritional Values', 'Calculator for the nutritional values of your breakfast choices.', '2023-10-20', '3', 6, 6, NULL),
  ('Weekly Breakfast Plan Page', 'Create a weekly breakfast meal plan based on your goals.', '2023-10-21', '2', 7, 6, NULL),
  ('Shopping List Generation', 'Function to generate a shopping list for the breakfast ingredients needed.', '2023-10-22', '1', 8, 6, NULL),
  ('Morning Decision Tracker', 'Function to keep track of what you have for breakfast and rate your choices.', '2023-10-24', '1', 10, 6, NULL),
  ('Write Tests', 'Continue to write tests as you code', '2023-10-26', '2', 12, 6, NULL);
