
-- with project ID and assigned_user

INSERT INTO tasks (name, description, due_date, status, index, project_id, assigned_user)
VALUES
  ('Project Planning and Ideation', 'Define project objectives, create a timeline, and brainstorm unique features.', '2023-10-12', '4', 2, 1, NULL),

  ('Market Research', 'Research pet and cat-related social media platforms for insights and opportunities.', '2023-11-12', '4', 3, 1, 2),

  ('Technology Stack Selection', 'Choose front-end and back-end technologies, including programming languages and databases.', '2023-12-12', '2', 0, 1, 3),

  ('UI/UX Design', 'Create wireframes, mockups, and a visually appealing cat-themed interface.', '2023-12-13', '2', 1, 1, 1),

  ('Front-End Development', 'Develop the front-end using HTML, CSS, and JavaScript with relevant frameworks.', '2023-12-14', '3', 0, 1, 4),

  ('Back-End Development', 'Build server-side logic, implement authentication, and create APIs for key features.', '2023-12-15', '3', 1, 1, 6),

  ('Database Setup and Management', 'Design the database schema, set up the database server, and implement queries.', '2023-12-16', '4', 0, 1, 5),
  
  ('Testing, Deployment, and Monitoring', 'Test for bugs, deploy to a web server, and set up monitoring for performance.', '2023-12-17', '4', 1, 1, 7),

  ('Content Creation', 'Generate and optimize text, images, and other media for the website pages.', '2023-12-16', '1', 2, 1, 3),

  ('User Registration and Login System', 'Implement user registration and login functionality with secure authentication.', '2023-12-21', '2', 2, 1, 1),

  ('E-commerce Functionality', 'Add e-commerce features, such as product listings and shopping cart functionality.', '2023-12-23', '1', 4, 1, 2),

  ('Mobile Responsiveness', 'Ensure the website is responsive and functions well on mobile devices.', '2023-12-25', '3', 2, 1, 4),

  ('Security Audit', 'Conduct a security audit to identify and address potential vulnerabilities and threats.', '2023-12-26', '1', 5, 1, 7),

  ('Performance Optimization', 'Optimize the website performance for faster loading and improved user experience.', '2023-12-27', '1', 6, 1, 5);


-- -- as mock:
-- const nameMockArr = [
--   {
--     id: 1
--     name: "Project Planning and Ideation",
--     description: "Define project objectives, create a timeline, and brainstorm unique features.",
--     project_id: 1,
--     due_date: 10-12-2023,
--     status: 'To Do',
--     assigned_user: 1
--   },
--   {
--     id: 2
--     name: "Market Research",
--     description: "Research pet and cat-related social media platforms for insights and opportunities.",
--     project_id: 1,
--     due_date: 11-12-2023,
--     status: 'To Do',
--     assigned_user: 2
--   },
--   {
--     id: 3
--     name: "Technology Stack Selection",
--     description: "Choose front-end and back-end technologies, including programming languages and databases.",
--     project_id: 1,
--     due_date: 12-12-2023,
--     status: 'To Do',
--     assigned_user: 3
--   },
--   {
--     id: 4
--     name: "UI/UX Design",
--     description: "Create wireframes, mockups, and a visually appealing cat-themed interface.",
--     project_id: 1,
--     due_date: 13-12-2023,
--     status: 'To Do',
--     assigned_user: 1
--   },
--   {
--     id: 5
--     name: "Front-End Development",
--     description: "Develop the front-end using HTML, CSS, and JavaScript with relevant frameworks.",
--     project_id: 1,
--     due_date: 14-12-2023,
--     status: 'To Do',
--     assigned_user: 4
--   },
--   {
--     id: 6
--     name: "Back-End Development",
--     description: "Build server-side logic, implement authentication, and create APIs for key features.",
--     project_id: 1,
--     due_date: 15-12-2023,
--     status: 'To Do',
--     assigned_user: 6
--   },
--   {
--     id: 7
--     name: "Database Setup and Management",
--     description: "Design the database schema, set up the database server, and implement queries.",
--     project_id: 1,
--     due_date: 16-12-2023,
--     status: 'To Do',
--     assigned_user: 5
--   },
--   {
--     id: 8
--     name: "Testing, Deployment, and Monitoring",
--     description: "Test for bugs, deploy to a web server, and set up monitoring for performance.",
--     project_id: 1,
--     due_date: 17-12-2023,
--     status: 'To Do',
--     assigned_user: 1
--   }
-- ]
