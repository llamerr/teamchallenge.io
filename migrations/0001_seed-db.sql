-- Populate artifact categories
INSERT INTO artifact_categories (slug, name, description, icon) VALUES 
('design-doc', 'Design Document', 'Technical documentation and design specifications', 'file-text'),
('database', 'Database Schema', 'Database design and schema definitions', 'database'),
('ui-design', 'UI Design', 'User interface design files', 'layout'),
('presentation', 'Presentation', 'Pitch decks and presentation materials', 'file');
-- Seed artifact tags
INSERT INTO artifact_tags (name, description) VALUES 
('e-commerce', 'Artifacts related to online shopping and retail platforms'),
('database', 'Database design and schema artifacts'),
('sql', 'Structured Query Language related artifacts'),
('schema', 'Database or system schema designs'),
('beginner-friendly', 'Artifacts suitable for beginners');
-- Seed project categories
INSERT INTO project_categories (slug, name, description, icon) VALUES
  ('spa', 'Single Page Application', 'Web applications that dynamically update content without full page reloads', 'code'),
  ('ssr-app', 'Server-Side Rendering Application', 'Web applications rendered on the server for improved performance and SEO', 'shopping-cart'),
  ('mobile', 'Mobile Application', 'Native or cross-platform mobile apps for iOS and Android', 'device-mobile'),
  ('backend', 'Backend Service', 'Server-side services and microservices', 'server'),
  ('game', 'Game Development', 'Video game development across various platforms', 'device-gamepad');
-- Seed technologies
INSERT INTO technologies (name, category) VALUES
  ('Next.js', 'Frontend'),
  ('React', 'Frontend'),
  ('Vue.js', 'Frontend'),
  ('React Native', 'Mobile'),
  ('PostgreSQL', 'Database'),
  ('MongoDB', 'Database'),
  ('Node.js', 'Backend'),
  ('Express', 'Backend'),
  ('Socket.io', 'Backend'),
  ('Stripe', 'Payment'),
  ('Tailwind CSS', 'Styling'),
  ('Unity', 'Game Engine'),
  ('C#', 'Programming Language'),
  ('Chart.js', 'Visualization'),
  ('Weather API', 'API'),
  ('Geolocation', 'API'),
  ('Prisma', 'Database'),
  ('Markdown', 'Styling'),
  ('Redis', 'Database'),
  ('JWT', 'Security'),
  ('Docker', 'DevOps'),
  ('Sprite Animation', 'Game Engine');
-- Seed roles
INSERT INTO roles (name, description, typical_skills, default_count) VALUES
  ('Frontend Developer', 'Responsible for client-side application development', ARRAY['React', 'CSS', 'JavaScript', 'UI/UX'], 1),
  ('Backend Developer', 'Handles server-side logic and database interactions', ARRAY['Node.js', 'API Design', 'Database Management'], 1),
  ('UI/UX Designer', 'Creates user interfaces and improves user experience', ARRAY['Figma', 'User Research', 'Prototyping'], 1),
  ('DevOps Engineer', 'Manages infrastructure, deployment, and system reliability', ARRAY['Docker', 'CI/CD', 'Cloud Services'], 1),
  ('Mobile Developer', 'Develops mobile applications for iOS and Android', ARRAY['React Native', 'Swift', 'Kotlin'], 1),
  ('Game Developer', 'Creates video games and interactive experiences', ARRAY['Unity', 'Game Design', 'C#'], 1),
  ('Content Strategist', 'Develops content plans and manages content creation', ARRAY['Content Writing', 'SEO', 'Marketing'], 1),
  ('Security Specialist', 'Ensures application security and compliance', ARRAY['Authentication', 'Authorization', 'Data Encryption'], 1),
  ('Artist', 'Creates visual assets for applications and games', ARRAY['Graphic Design', 'Illustration', 'Animation'], 1),
  ('Sound Designer', 'Creates audio assets for applications and games', ARRAY['Audio Editing', 'Sound Effects', 'Music Composition'], 1);
-- Seed languages
INSERT INTO languages (name, description) VALUES
  ('English', 'English language'),
  ('Spanish', 'Spanish language'),
  ('French', 'French language'),
  ('German', 'German language'),
  ('Chinese', 'Chinese language'),
  ('Japanese', 'Japanese language'),
  ('Russian', 'Russian language'),
  ('Portuguese', 'Portuguese language');
-- Populate artifacts
INSERT INTO artifacts (
    title, 
    description, 
    category_id, 
    file_size, 
    file_path, 
    version_number, 
    version_type, 
    downloads, 
    views, 
    status,
    is_current
) VALUES 
(
    'E-commerce Database Schema', 
    'A comprehensive database schema for an e-commerce platform with user accounts, products, orders, and reviews.', 
    (SELECT id FROM artifact_categories WHERE slug = 'database'),
    24576, -- 24KB 
    '/artifacts/ecommerce_schema.sql',
    '1.0.0',
    'original',
    128,
    50,
    'published',
    true
),
(
    'Task Manager UI Design', 
    'Modern UI design for a task management application with dark and light themes.', 
    (SELECT id FROM artifact_categories WHERE slug = 'ui-design'),
    8912896, -- 8.5MB
    '/artifacts/task_manager_ui.figma',
    '1.0.0',
    'original',
    87,
    30,
    'published',
    true
),
(
    'Social Media App Architecture', 
    'System architecture document outlining the components and interactions for a social media application.', 
    (SELECT id FROM artifact_categories WHERE slug = 'design-doc'),
    1258291, -- 1.2MB
    '/artifacts/social_media_architecture.pdf',
    '1.0.0',
    'original',
    156,
    75,
    'published',
    true
),
(
    'Weather App Presentation', 
    'Pitch deck for a weather application with market analysis and technical overview.', 
    (SELECT id FROM artifact_categories WHERE slug = 'presentation'),
    6082150, -- 5.8MB
    '/artifacts/weather_app_pitch.pptx',
    '1.0.0',
    'original',
    42,
    20,
    'published',
    true
),
(
    'Fitness Tracker Database Schema', 
    'Database schema for a fitness tracking application with user profiles, workouts, and progress tracking.', 
    (SELECT id FROM artifact_categories WHERE slug = 'database'),
    18432, -- 18KB
    '/artifacts/fitness_tracker_schema.sql',
    '1.0.0',
    'original',
    76,
    40,
    'published',
    true
),
(
    'Recipe App Wireframes', 
    'Low-fidelity wireframes for a recipe sharing and meal planning application.', 
    (SELECT id FROM artifact_categories WHERE slug = 'ui-design'),
    3355443, -- 3.2MB
    '/artifacts/recipe_app_wireframes.sketch',
    '1.0.0',
    'original',
    93,
    35,
    'published',
    true
),
(
    'Blog Platform Database Design', 
    'Detailed database schema for a modern blog platform with user management, posts, comments, and analytics.', 
    (SELECT id FROM artifact_categories WHERE slug = 'database'),
    32768, -- 32KB
    '/artifacts/blog_platform_schema.sql',
    '1.0.0',
    'original',
    95,
    55,
    'published',
    true
),
(
    'Inventory Management Schema', 
    'Comprehensive database design for tracking inventory, stock levels, and product variations.', 
    (SELECT id FROM artifact_categories WHERE slug = 'database'),
    25600, -- 25KB
    '/artifacts/inventory_management_schema.sql',
    '1.0.0',
    'original',
    112,
    65,
    'published',
    true
);
-- Link tags to artifacts
INSERT INTO artifacts_to_artifact_tags (artifact_id, artifact_tag_id) VALUES 
(1, (SELECT id FROM artifact_tags WHERE name = 'e-commerce')),
(1, (SELECT id FROM artifact_tags WHERE name = 'database')),
(1, (SELECT id FROM artifact_tags WHERE name = 'sql')),
(1, (SELECT id FROM artifact_tags WHERE name = 'schema')),
(1, (SELECT id FROM artifact_tags WHERE name = 'beginner-friendly'));
-- Seed projects
INSERT INTO projects (
  title, 
  description, 
  long_description, 
  category_id, 
  complexity, 
  longevity, 
  duration, 
  team_size, 
  progress, 
  stars, 
  forks, 
  last_updated, 
  created_at, 
  repository_url, 
  demo_url
) VALUES 
  (
    'E-commerce Platform', 
    'A full-featured e-commerce platform with product listings, shopping cart, user accounts, and payment processing.',
    'This e-commerce platform project is designed to provide a comprehensive learning experience for developers looking to understand how online stores work. It includes product catalog management, user authentication, shopping cart functionality, checkout process with payment integration, order management, and an admin dashboard.',
    (SELECT id FROM project_categories WHERE slug = 'ssr-app'),
    'high', 
    'long-term', 
    '3-4 months', 
    4, 
    85, 
    124, 
    37, 
    '2023-11-15', 
    '2023-08-22', 
    'https://github.com/example/ecommerce-platform', 
    'https://ecommerce-platform-demo.vercel.app'
  ),
  (
    'Real-time Chat Application', 
    'A chat application with real-time messaging, user presence indicators, and message history.',
    'A modern chat application designed to demonstrate real-time communication technologies and user interaction patterns.',
    (SELECT id FROM project_categories WHERE slug = 'spa'),
    'medium', 
    'medium-term', 
    '2-3 months', 
    3, 
    60, 
    45, 
    12, 
    '2023-10-28', 
    '2023-09-01', 
    'https://github.com/example/chat-app', 
    'https://chat-app-demo.vercel.app'
  ),
  (
    'Task Management System', 
    'A project management tool with task tracking, assignments, deadlines, and progress reporting.',
    'This project management tool is designed to help teams organize and prioritize tasks, track progress, and collaborate on projects.',
    (SELECT id FROM project_categories WHERE slug = 'spa'),
    'medium', 
    'medium-term', 
    '2-3 months', 
    3, 
    70, 
    65, 
    18, 
    '2023-11-02', 
    '2023-09-15', 
    'https://github.com/example/task-management-system', 
    'https://task-management-system-demo.vercel.app'
  ),
  (
    'Mobile Weather App', 
    'A weather application for mobile devices with current conditions, forecasts, and location-based services.',
    'A mobile weather app designed to provide users with accurate and up-to-date weather information on-the-go.',
    (SELECT id FROM project_categories WHERE slug = 'mobile'),
    'low', 
    'short-term', 
    '1-2 months', 
    2, 
    50, 
    30, 
    8, 
    '2023-10-10', 
    '2023-09-01', 
    'https://github.com/example/mobile-weather-app', 
    'https://mobile-weather-app-demo.vercel.app'
  ),
  (
    'Blog Platform', 
    'A content management system for creating and managing blog posts with user comments and social sharing.',
    'A blog platform designed to provide users with a simple and intuitive way to create, manage, and share blog content.',
    (SELECT id FROM project_categories WHERE slug = 'ssr-app'),
    'medium', 
    'medium-term', 
    '2-3 months', 
    3, 
    75, 
    90, 
    25, 
    '2023-11-08', 
    '2023-09-20', 
    'https://github.com/example/blog-platform', 
    'https://blog-platform-demo.vercel.app'
  ),
  (
    'API Gateway Service', 
    'A backend service that acts as a gateway for multiple microservices with authentication and rate limiting.',
    'An API gateway service designed to provide a secure and scalable way to manage multiple microservices and APIs.',
    (SELECT id FROM project_categories WHERE slug = 'backend'),
    'high', 
    'long-term', 
    '3-4 months', 
    3, 
    80, 
    110, 
    35, 
    '2023-10-20', 
    '2023-08-01', 
    'https://github.com/example/api-gateway-service', 
    'https://api-gateway-service-demo.vercel.app'
  ),
  (
    '2D Platformer Game', 
    'A simple 2D platformer game with character movement, obstacles, and level progression.',
    'A 2D platformer game designed to provide a fun and challenging gaming experience for players.',
    (SELECT id FROM project_categories WHERE slug = 'game'),
    'medium', 
    'medium-term', 
    '2-3 months', 
    3, 
    60, 
    75, 
    20, 
    '2023-11-12', 
    '2023-09-10', 
    'https://github.com/example/2d-platformer-game', 
    'https://2d-platformer-game-demo.vercel.app'
  ),
  (
    'Personal Finance Tracker', 
    'An application to track personal expenses, income, and financial goals with data visualization.',
    'A personal finance tracker designed to help users manage their finances and achieve their financial goals.',
    (SELECT id FROM project_categories WHERE slug = 'spa'),
    'medium', 
    'medium-term', 
    '2-3 months', 
    2, 
    65, 
    55, 
    15, 
    '2023-10-15', 
    '2023-08-15', 
    'https://github.com/example/personal-finance-tracker', 
    'https://personal-finance-tracker-demo.vercel.app'
  );
-- Seed project technologies
INSERT INTO projects_to_technologies (project_id, technology_id, "primary") VALUES
  (1, (SELECT id FROM technologies WHERE name = 'Next.js'), true),
  (1, (SELECT id FROM technologies WHERE name = 'PostgreSQL'), true),
  (1, (SELECT id FROM technologies WHERE name = 'Stripe'), false),
  (1, (SELECT id FROM technologies WHERE name = 'Tailwind CSS'), false),
  (2, (SELECT id FROM technologies WHERE name = 'React'), true),
  (2, (SELECT id FROM technologies WHERE name = 'Socket.io'), true),
  (2, (SELECT id FROM technologies WHERE name = 'Express'), false),
  (2, (SELECT id FROM technologies WHERE name = 'MongoDB'), false),
  -- Task Management System
  (3, (SELECT id FROM technologies WHERE name = 'Vue.js'), true),
  (3, (SELECT id FROM technologies WHERE name = 'Node.js'), false),
  (3, (SELECT id FROM technologies WHERE name = 'Express'), false),
  (3, (SELECT id FROM technologies WHERE name = 'MongoDB'), false),
  -- Mobile Weather App
  (4, (SELECT id FROM technologies WHERE name = 'React Native'), true),
  (4, (SELECT id FROM technologies WHERE name = 'Weather API'), false),
  (4, (SELECT id FROM technologies WHERE name = 'Geolocation'), false),
  -- Blog Platform
  (5, (SELECT id FROM technologies WHERE name = 'Next.js'), true),
  (5, (SELECT id FROM technologies WHERE name = 'Prisma'), false),
  (5, (SELECT id FROM technologies WHERE name = 'PostgreSQL'), false),
  (5, (SELECT id FROM technologies WHERE name = 'Markdown'), false),
  -- API Gateway Service
  (6, (SELECT id FROM technologies WHERE name = 'Node.js'), true),
  (6, (SELECT id FROM technologies WHERE name = 'Express'), true),
  (6, (SELECT id FROM technologies WHERE name = 'Redis'), false),
  (6, (SELECT id FROM technologies WHERE name = 'JWT'), false),
  (6, (SELECT id FROM technologies WHERE name = 'Docker'), false),
  -- 2D Platformer Game
  (7, (SELECT id FROM technologies WHERE name = 'Unity'), true),
  (7, (SELECT id FROM technologies WHERE name = 'C#'), true),
  (7, (SELECT id FROM technologies WHERE name = 'Sprite Animation'), false),
  -- Personal Finance Tracker
  (8, (SELECT id FROM technologies WHERE name = 'React'), true),
  (8, (SELECT id FROM technologies WHERE name = 'Node.js'), false),
  (8, (SELECT id FROM technologies WHERE name = 'Chart.js'), false),
  (8, (SELECT id FROM technologies WHERE name = 'MongoDB'), false);
-- Seed project roles
INSERT INTO projects_to_roles (project_id, role_id, count, specific_skills) VALUES
  (1, (SELECT id FROM roles WHERE name = 'Frontend Developer'), 1, ARRAY['Next.js', 'Tailwind CSS']),
  (1, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Node.js', 'PostgreSQL']),
  (1, (SELECT id FROM roles WHERE name = 'UI/UX Designer'), 1, ARRAY['E-commerce UX']),
  (1, (SELECT id FROM roles WHERE name = 'DevOps Engineer'), 1, ARRAY['Stripe Integration']),
  (2, (SELECT id FROM roles WHERE name = 'Frontend Developer'), 1, ARRAY['React', 'WebSockets']),
  (2, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Socket.io', 'MongoDB']),
  (2, (SELECT id FROM roles WHERE name = 'UI/UX Designer'), 1, ARRAY['Chat App Design']),
  -- Task Management System
  (3, (SELECT id FROM roles WHERE name = 'Frontend Developer'), 1, ARRAY['Vue.js', 'State Management']),
  (3, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Node.js', 'MongoDB']),
  (3, (SELECT id FROM roles WHERE name = 'UI/UX Designer'), 1, ARRAY['Project Management UI']),
  -- Mobile Weather App
  (4, (SELECT id FROM roles WHERE name = 'Mobile Developer'), 1, ARRAY['React Native', 'Mobile UI']),
  (4, (SELECT id FROM roles WHERE name = 'UI/UX Designer'), 1, ARRAY['Weather App Design']),
  -- Blog Platform
  (5, (SELECT id FROM roles WHERE name = 'Frontend Developer'), 1, ARRAY['Next.js', 'Markdown Rendering']),
  (5, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Prisma', 'PostgreSQL']),
  (5, (SELECT id FROM roles WHERE name = 'Content Strategist'), 1, ARRAY['Blog Content Planning']),
  -- API Gateway Service
  (6, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Microservices', 'API Design']),
  (6, (SELECT id FROM roles WHERE name = 'DevOps Engineer'), 1, ARRAY['Docker', 'Containerization']),
  (6, (SELECT id FROM roles WHERE name = 'Security Specialist'), 1, ARRAY['Authentication', 'Rate Limiting']),
  -- 2D Platformer Game
  (7, (SELECT id FROM roles WHERE name = 'Game Developer'), 1, ARRAY['Unity', 'Game Mechanics']),
  (7, (SELECT id FROM roles WHERE name = 'Artist'), 1, ARRAY['2D Art', 'Sprite Design']),
  (7, (SELECT id FROM roles WHERE name = 'Sound Designer'), 1, ARRAY['Game Audio']),
  -- Personal Finance Tracker
  (8, (SELECT id FROM roles WHERE name = 'Frontend Developer'), 1, ARRAY['React', 'Data Visualization']),
  (8, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Node.js', 'Financial Data Processing']);
-- Seed project learning outcomes
INSERT INTO project_learning_outcomes (project_id, outcome) VALUES
  (1, 'Understanding of full-stack web application architecture'),
  (1, 'Experience with server-side rendering and SEO optimization'),
  (1, 'Implementation of secure user authentication and authorization'),
  (1, 'Integration with third-party payment processing services'),
  (2, 'Real-time communication technologies'),
  (2, 'WebSocket implementation'),
  (2, 'State management in real-time applications'),
  -- Task Management System
  (3, 'Understanding of project management workflows'),
  (3, 'Implementing task tracking and assignment systems'),
  (3, 'Building responsive and interactive web applications'),
  -- Mobile Weather App
  (4, 'Mobile app development with React Native'),
  (4, 'Working with geolocation and weather APIs'),
  (4, 'Creating responsive mobile user interfaces'),
  -- Blog Platform
  (5, 'Content management system design'),
  (5, 'Server-side rendering with Next.js'),
  (5, 'Database design for content storage'),
  -- API Gateway Service
  (6, 'Microservices architecture'),
  (6, 'API security and authentication'),
  (6, 'Implementing rate limiting and access control'),
  -- 2D Platformer Game
  (7, 'Game development fundamentals'),
  (7, 'Sprite animation and game mechanics'),
  (7, 'Cross-platform game development'),
  -- Personal Finance Tracker
  (8, 'Financial data visualization'),
  (8, 'Building data-driven web applications'),
  (8, 'Implementing complex data processing logic');
-- Seed teams
INSERT INTO teams (name, project_id, title, description, long_description, progress, start_date, status) VALUES 
('E-commerce Team', (SELECT id FROM projects WHERE title = 'E-commerce Platform'), 'E-commerce Platform Team', 'Team building an e-commerce platform', 'Developing a full-stack e-commerce platform with shopping cart, payment processing, and user management', 25, '2025-01-15', 'active'),
('Blog Team', (SELECT id FROM projects WHERE title = 'Blog Platform'), 'Blog Platform Team', 'Team creating a modern blog platform', 'Building a scalable blog platform with markdown support, comments, and user authentication', 15, '2025-02-01', 'active'),
('API Gateway Team', (SELECT id FROM projects WHERE title = 'API Gateway Service'), 'API Gateway Service Team', 'Team developing an API gateway service', 'Creating a high-performance API gateway with rate limiting, authentication, and request routing', 30, '2025-01-20', 'active'),
('Game Development Team', (SELECT id FROM projects WHERE title = '2D Platformer Game'), '2D Platformer Game Team', 'Team building a 2D platformer game', 'Developing a 2D platformer game with physics, animations, and level design', 20, '2025-02-05', 'active'),
('Finance Tracker Team', (SELECT id FROM projects WHERE title = 'Personal Finance Tracker'), 'Personal Finance Tracker Team', 'Team creating a personal finance tracker', 'Building a personal finance tracker with budgeting, expense tracking, and visualization', 10, '2025-02-10', 'active');
-- Link artifacts to projects
INSERT INTO artifacts_to_projects (artifact_id, project_id, added_at) VALUES 
(1, (SELECT id FROM projects WHERE title = 'E-commerce Platform'), NOW()),
(1, (SELECT id FROM projects WHERE title = 'Blog Platform'), NOW()),
(1, (SELECT id FROM projects WHERE title = 'API Gateway Service'), NOW()),
(1, (SELECT id FROM projects WHERE title = '2D Platformer Game'), NOW()),
(1, (SELECT id FROM projects WHERE title = 'Personal Finance Tracker'), NOW());
-- Seed users
INSERT INTO "users" ("id", "username", "email", "password", "created_at", "updated_at") VALUES
  (1, 'Abigail Adams', 'A.Abigail@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (2, 'Bernard Brown', 'B.Bernard@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (3, 'Clementine Clark', 'C.Clementine@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (4, 'Dorothy Davis', 'D.Dorothy@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (5, 'Evelyn Edwards', 'E.Evelyn@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (6, 'Florence Foster', 'F.Florence@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (7, 'Gwendolyn Gibson', 'G.Gwendolyn@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (8, 'Helen Hall', 'H.Helen@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (9, 'Isabella Ingram', 'I.Isabella@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (10, 'Julia Jenkins', 'J.Julia@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (11, 'Katherine Kennedy', 'K.Katherine@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (12, 'Lily Lewis', 'L.Lily@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (13, 'Margaret Martin', 'M.Margaret@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (14, 'Natalie Nelson', 'N.Natalie@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (15, 'Olivia Owen', 'O.Olivia@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (16, 'Penelope Patel', 'P.Penelope@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (17, 'Quincy Quinn', 'Q.Quincy@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (18, 'Rachel Reed', 'R.Rachel@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (19, 'Sophia Sanchez', 'S.Sophia@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (20, 'Tessa Taylor', 'T.Tessa@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (21, 'Ursula Underwood', 'U.Ursula@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (22, 'Vivian Vaughn', 'V.Vivian@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (23, 'Wendy Watson', 'W.Wendy@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (24, 'Xanthe Xavier', 'X.Xanthe@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (25, 'Yolanda York', 'Y.Yolanda@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (26, 'Zoey Zhang', 'Z.Zoey@example.com', 'password123', '2023-01-01 00:00:00', '2023-01-01 00:00:00');
-- Seed user profiles
INSERT INTO "user_profiles" ("id", "user_id", "title", "avatar_url", "location", "about", "github_username", "linkedin_username", "twitter_username", "website_url", "availability_status", "availability_date", "created_at", "updated_at") VALUES
  (1, 1, 'Frontend Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a frontend developer', 'frontend', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (2, 2, 'Backend Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a backend developer', 'backend', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (3, 3, 'Full Stack Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a full stack developer', 'fullstack', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (4, 4, 'Designer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a designer', 'designer', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (5, 5, 'Project Manager', '/placeholder.svg?height=200&width=200', 'New York', 'I am a project manager', 'pm', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (6, 6, 'DevOps Engineer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a devops engineer', 'devops', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (7, 7, 'Data Scientist', '/placeholder.svg?height=200&width=200', 'New York', 'I am a data scientist', 'data', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (8, 8, 'QA Engineer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a qa engineer', 'qa', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (9, 9, 'UI/UX Designer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a ui/ux designer', 'ui', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (10, 10, 'Mobile Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a mobile developer', 'mobile', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (11, 11, 'Full Stack Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a full stack developer', 'fullstack', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (12, 12, 'Designer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a designer', 'designer', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (13, 13, 'Project Manager', '/placeholder.svg?height=200&width=200', 'New York', 'I am a project manager', 'pm', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (14, 14, 'DevOps Engineer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a devops engineer', 'devops', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (15, 15, 'Data Scientist', '/placeholder.svg?height=200&width=200', 'New York', 'I am a data scientist', 'data', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (16, 16, 'QA Engineer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a qa engineer', 'qa', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (17, 17, 'UI/UX Designer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a ui/ux designer', 'ui', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (18, 18, 'Mobile Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a mobile developer', 'mobile', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (19, 19, 'Full Stack Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a full stack developer', 'fullstack', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (20, 20, 'Designer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a designer', 'designer', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (21, 21, 'Project Manager', '/placeholder.svg?height=200&width=200', 'New York', 'I am a project manager', 'pm', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (22, 22, 'DevOps Engineer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a devops engineer', 'devops', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (23, 23, 'Data Scientist', '/placeholder.svg?height=200&width=200', 'New York', 'I am a data scientist', 'data', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (24, 24, 'QA Engineer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a qa engineer', 'qa', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (25, 25, 'UI/UX Designer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a ui/ux designer', 'ui', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (26, 26, 'Mobile Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a mobile developer', 'mobile', 'linkedin', 'twitter', 'website', 'Available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00')