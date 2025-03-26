-- Populate artifact categories
INSERT INTO artifact_categories (slug, name, description, icon) VALUES 
('design-doc', 'Design Document', 'Technical documentation and design specifications', 'file-text'),
('database', 'Database Schema', 'Database design and schema definitions', 'database'),
('ui-design', 'UI Design', 'User interface design files', 'layout'),
('presentation', 'Presentation', 'Pitch decks and presentation materials', 'file');
-- Seed artifact tags with 20 comprehensive tags
INSERT INTO artifact_tags (name, description) VALUES 
('e-commerce', 'Artifacts related to online shopping and retail platforms'),
('database', 'Database design and schema artifacts'),
('sql', 'Structured Query Language related artifacts'),
('schema', 'Database or system schema designs'),
('beginner-friendly', 'Artifacts suitable for beginners'),
('ui-design', 'User interface design artifacts and resources'),
('machine-learning', 'Artifacts related to artificial intelligence and machine learning'),
('iot', 'Internet of Things related artifacts'),
('cloud-computing', 'Artifacts focusing on cloud infrastructure and services'),
('mobile-development', 'Mobile application development resources'),
('web-development', 'Web application and website development artifacts'),
('data-visualization', 'Tools and designs for presenting data graphically'),
('cybersecurity', 'Security-focused design and implementation artifacts'),
('blockchain', 'Distributed ledger and cryptocurrency-related artifacts'),
('devops', 'Continuous integration, deployment, and infrastructure artifacts'),
('enterprise-architecture', 'Large-scale system design and architectural patterns'),
('real-time', 'Artifacts supporting live, instantaneous data processing'),
('microservices', 'Distributed system design following microservices architecture'),
('frontend-framework', 'Artifacts related to modern frontend development frameworks'),
('backend-optimization', 'Performance and scalability-focused backend artifacts');-- Seed project categories
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
  ('Svelte', 'Frontend'),
  ('Angular', 'Frontend'),
  ('React Native', 'Mobile'),
  ('Flutter', 'Mobile'),
  ('Kotlin', 'Mobile'),
  ('Swift', 'Mobile'),
  ('PostgreSQL', 'Database'),
  ('MongoDB', 'Database'),
  ('MySQL', 'Database'),
  ('Redis', 'Database'),
  ('Cassandra', 'Database'),
  ('Node.js', 'Backend'),
  ('Express', 'Backend'),
  ('Nest.js', 'Backend'),
  ('Django', 'Backend'),
  ('Flask', 'Backend'),
  ('Socket.io', 'Backend'),
  ('GraphQL', 'Backend'),
  ('Stripe', 'Payment'),
  ('PayPal', 'Payment'),
  ('Braintree', 'Payment'),
  ('Tailwind CSS', 'Styling'),
  ('SASS', 'Styling'),
  ('CSS Modules', 'Styling'),
  ('Unity', 'Game Engine'),
  ('Unreal Engine', 'Game Engine'),
  ('Godot', 'Game Engine'),
  ('C#', 'Programming Language'),
  ('Python', 'Programming Language'),
  ('Rust', 'Programming Language'),
  ('Go', 'Programming Language'),
  ('TypeScript', 'Programming Language'),
  ('Chart.js', 'Visualization'),
  ('D3.js', 'Visualization'),
  ('Plotly', 'Visualization'),
  ('Weather API', 'API'),
  ('Geolocation', 'API'),
  ('OpenAI', 'API'),
  ('Google Maps', 'API'),
  ('Prisma', 'Database ORM'),
  ('Markdown', 'Styling'),
  ('JWT', 'Security'),
  ('OAuth', 'Security'),
  ('Docker', 'DevOps'),
  ('Kubernetes', 'DevOps'),
  ('Terraform', 'DevOps');-- Seed roles
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
  ('Sound Designer', 'Creates audio assets for applications and games', ARRAY['Audio Editing', 'Sound Effects', 'Music Composition'], 1),
  ('Data Analyst', 'Analyzes data to provide insights and recommendations', ARRAY['Data Analysis', 'Statistics', 'Data Visualization'], 1),
  ('Project Manager', 'Oversees project planning, execution, and delivery', ARRAY['Project Planning', 'Resource Management', 'Risk Analysis'], 1),
  ('Business Analyst', 'Analyzes business processes and requirements to inform technical decisions', ARRAY['Business Analysis', 'Requirements Gathering', 'Process Mapping'], 1),
  ('Technical Writer', 'Writes technical documentation and guides for software and hardware products', ARRAY['Technical Writing', 'Documentation', 'User Guides'], 1),
  ('QA Engineer', 'Ensures software quality through testing and quality assurance', ARRAY['Testing', 'Quality Assurance', 'Bug Tracking'], 1),
  ('System Architect', 'Designs and implements system architecture and infrastructure', ARRAY['System Architecture', 'Infrastructure Design', 'Cloud Services'], 1),
  ('Cloud Engineer', 'Manages cloud infrastructure and services', ARRAY['Cloud Services', 'Infrastructure Management', 'Cloud Security'], 1),
  ('Data Engineer', 'Develops and manages data pipelines and data warehouses', ARRAY['Data Engineering', 'Data Processing', 'Data Storage'], 1);
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
-- Populate artifacts with 20 entries
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
),
(
    'Machine Learning Model Architecture', 
    'Detailed architecture document for a deep learning image classification model.', 
    (SELECT id FROM artifact_categories WHERE slug = 'design-doc'),
    512000, -- 500KB
    '/artifacts/ml_model_architecture.pdf',
    '1.0.0',
    'original',
    64,
    45,
    'published',
    true
),
(
    'IoT Home Automation Diagram', 
    'Comprehensive system diagram for a home automation platform with device interactions.', 
    (SELECT id FROM artifact_categories WHERE slug = 'design-doc'),
    2097152, -- 2MB
    '/artifacts/iot_home_automation_diagram.visio',
    '1.0.0',
    'original',
    53,
    37,
    'published',
    true
),
(
    'Cryptocurrency Trading Bot UML', 
    'Unified Modeling Language (UML) diagram for a sophisticated trading algorithm.', 
    (SELECT id FROM artifact_categories WHERE slug = 'design-doc'),
    1048576, -- 1MB
    '/artifacts/trading_bot_uml.xml',
    '1.0.0',
    'original',
    78,
    52,
    'published',
    true
),
(
    'Real-time Chat App Wireframes', 
    'Comprehensive UI/UX wireframes for a real-time communication application.', 
    (SELECT id FROM artifact_categories WHERE slug = 'ui-design'),
    5242880, -- 5MB
    '/artifacts/chat_app_wireframes.xd',
    '1.0.0',
    'original',
    91,
    48,
    'published',
    true
),
(
    'E-learning Platform ER Diagram', 
    'Entity-Relationship diagram for an online learning management system.', 
    (SELECT id FROM artifact_categories WHERE slug = 'database'),
    40960, -- 40KB
    '/artifacts/elearning_er_diagram.sql',
    '1.0.0',
    'original',
    67,
    39,
    'published',
    true
),
(
    'Personal Finance Dashboard Mockup', 
    'High-fidelity UI mockup for a comprehensive personal finance tracking application.', 
    (SELECT id FROM artifact_categories WHERE slug = 'ui-design'),
    7340032, -- 7MB
    '/artifacts/finance_dashboard_mockup.psd',
    '1.0.0',
    'original',
    82,
    47,
    'published',
    true
),
(
    'Game Development Technical Design', 
    'Technical design document for a 2D platformer game engine and mechanics.', 
    (SELECT id FROM artifact_categories WHERE slug = 'design-doc'),
    768000, -- 750KB
    '/artifacts/game_dev_technical_design.docx',
    '1.0.0',
    'original',
    59,
    33,
    'published',
    true
),
(
    'Travel Booking System Schema', 
    'Comprehensive database schema for a multi-platform travel booking application.', 
    (SELECT id FROM artifact_categories WHERE slug = 'database'),
    51200, -- 50KB
    '/artifacts/travel_booking_schema.sql',
    '1.0.0',
    'original',
    105,
    62,
    'published',
    true
),
(
    'Healthcare App Network Architecture', 
    'Detailed network architecture for a secure patient management and telemedicine platform.', 
    (SELECT id FROM artifact_categories WHERE slug = 'design-doc'),
    1572864, -- 1.5MB
    '/artifacts/healthcare_network_architecture.vsdx',
    '1.0.0',
    'original',
    71,
    42,
    'published',
    true
),
(
    'Streaming Platform UI Kit', 
    'Comprehensive UI design kit for a multi-platform media streaming application.', 
    (SELECT id FROM artifact_categories WHERE slug = 'ui-design'),
    10485760, -- 10MB
    '/artifacts/streaming_platform_ui_kit.sketch',
    '1.0.0',
    'original',
    88,
    51,
    'published',
    true
),
(
    'E-commerce Payment Gateway Design', 
    'Secure payment gateway architecture for an online marketplace platform.', 
    (SELECT id FROM artifact_categories WHERE slug = 'design-doc'),
    614400, -- 600KB
    '/artifacts/payment_gateway_design.pdf',
    '1.0.0',
    'original',
    96,
    58,
    'published',
    true
),
(
    'Social Network Graph Database', 
    'Complex graph database schema for a sophisticated social networking platform.', 
    (SELECT id FROM artifact_categories WHERE slug = 'database'),
    36864, -- 36KB
    '/artifacts/social_network_graph_schema.sql',
    '1.0.0',
    'original',
    103,
    61,
    'published',
    true
);-- Link artifacts to tags randomly
INSERT INTO artifacts_to_artifact_tags (artifact_id, artifact_tag_id) VALUES 
-- Artifact 1 (E-commerce Database Schema)
(1, 1),  -- e-commerce
(1, 2),  -- database
(1, 3),  -- sql
(1, 4),  -- schema
(1, 5),  -- beginner-friendly

-- Artifact 2 (Task Manager UI Design)
(2, 6),   -- ui-design
(2, 11),  -- web-development
(2, 19),  -- frontend-framework
(2, 17),  -- real-time
(2, 9),   -- cloud-computing

-- Artifact 3 (Social Media App Architecture)
(3, 16),  -- enterprise-architecture
(3, 11),  -- web-development
(3, 18),  -- microservices
(3, 15),  -- devops
(3, 20),  -- backend-optimization

-- Artifact 4 (Weather App Presentation)
(4, 10),  -- mobile-development
(4, 6),   -- ui-design
(4, 17),  -- real-time
(4, 9),   -- cloud-computing
(4, 19),  -- frontend-framework

-- Artifact 5 (Fitness Tracker Database Schema)
(5, 2),   -- database
(5, 3),   -- sql
(5, 4),   -- schema
(5, 10),  -- mobile-development
(5, 20),  -- backend-optimization

-- Artifact 6 (Recipe App Wireframes)
(6, 6),   -- ui-design
(6, 11),  -- web-development
(6, 19),  -- frontend-framework
(6, 10),  -- mobile-development
(6, 17),  -- real-time

-- Artifact 7 (Blog Platform Database Design)
(7, 2),   -- database
(7, 3),   -- sql
(7, 11),  -- web-development
(7, 16),  -- enterprise-architecture
(7, 15),  -- devops

-- Artifact 8 (Inventory Management Schema)
(8, 2),   -- database
(8, 3),   -- sql
(8, 4),   -- schema
(8, 15),  -- devops
(8, 20),  -- backend-optimization

-- Artifact 9 (Machine Learning Model Architecture)
(9, 7),   -- machine-learning
(9, 16),  -- enterprise-architecture
(9, 11),  -- web-development
(9, 20),  -- backend-optimization
(9, 17),  -- real-time

-- Artifact 10 (IoT Home Automation Diagram)
(10, 8),  -- iot
(10, 9),  -- cloud-computing
(10, 16), -- enterprise-architecture
(10, 17), -- real-time
(10, 15), -- devops

-- Artifact 11 (Cryptocurrency Trading Bot UML)
(11, 14), -- blockchain
(11, 18), -- microservices
(11, 15), -- devops
(11, 17), -- real-time
(11, 20), -- backend-optimization

-- Artifact 12 (Real-time Chat App Wireframes)
(12, 6),  -- ui-design
(12, 11), -- web-development
(12, 17), -- real-time
(12, 19), -- frontend-framework
(12, 10), -- mobile-development

-- Artifact 13 (E-learning Platform ER Diagram)
(13, 2),  -- database
(13, 3),  -- sql
(13, 4),  -- schema
(13, 11), -- web-development
(13, 16), -- enterprise-architecture

-- Artifact 14 (Personal Finance Dashboard Mockup)
(14, 6),  -- ui-design
(14, 11), -- web-development
(14, 12), -- data-visualization
(14, 19), -- frontend-framework
(14, 20), -- backend-optimization

-- Artifact 15 (Game Development Technical Design)
(15, 16), -- enterprise-architecture
(15, 11), -- web-development
(15, 18), -- microservices
(15, 15), -- devops
(15, 19), -- frontend-framework

-- Artifact 16 (Travel Booking System Schema)
(16, 2),  -- database
(16, 3),  -- sql
(16, 4),  -- schema
(16, 11), -- web-development
(16, 9),  -- cloud-computing

-- Artifact 17 (Healthcare App Network Architecture)
(17, 13), -- cybersecurity
(17, 16), -- enterprise-architecture
(17, 15), -- devops
(17, 18), -- microservices
(17, 20), -- backend-optimization

-- Artifact 18 (Streaming Platform UI Kit)
(18, 6),  -- ui-design
(18, 11), -- web-development
(18, 19), -- frontend-framework
(18, 10), -- mobile-development
(18, 17), -- real-time

-- Artifact 19 (E-commerce Payment Gateway Design)
(19, 1),  -- e-commerce
(19, 13), -- cybersecurity
(19, 11), -- web-development
(19, 15), -- devops
(19, 20), -- backend-optimization

-- Artifact 20 (Social Network Graph Database)
(20, 2),  -- database
(20, 18), -- microservices
(20, 11), -- web-development
(20, 16), -- enterprise-architecture
(20, 15); -- devops-- Seed projects
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
  ),
  (
    'Image Compression Tool', 
    'A command line tool for compressing images using various algorithms.',
    'An image compression tool designed to provide a fast and efficient way to reduce image file sizes.',
    (SELECT id FROM project_categories WHERE slug = 'cli-app'),
    'low', 
    'short-term', 
    '1-2 months', 
    2, 
    50, 
    45, 
    10, 
    '2023-11-15', 
    '2023-09-15', 
    'https://github.com/example/image-compression-tool', 
    'https://image-compression-tool-demo.vercel.app'
  ),
  (
    'Web Scraper', 
    'A web application to extract data from web pages using a simple query language.',
    'A web scraper designed to provide a fast and efficient way to extract data from web pages.',
    (SELECT id FROM project_categories WHERE slug = 'web-app'),
    'medium', 
    'medium-term', 
    '2-3 months', 
    2, 
    70, 
    60, 
    20, 
    '2023-11-18', 
    '2023-09-15', 
    'https://github.com/example/web-scraper', 
    'https://web-scraper-demo.vercel.app'
  ),
  (
    'Chatbot', 
    'A conversational AI chatbot integrated with a messaging platform.',
    'A chatbot designed to provide a helpful and engaging way for users to interact with a company.',
    (SELECT id FROM project_categories WHERE slug = 'ai-app'),
    'high', 
    'long-term', 
    '3-4 months', 
    3, 
    90, 
    120, 
    30, 
    '2023-10-25', 
    '2023-08-10', 
    'https://github.com/example/chatbot', 
    'https://chatbot-demo.vercel.app'
  ),
  (
    'E-commerce Website', 
    'A full-featured e-commerce website with product listings, shopping cart, user accounts, and payment processing.',
    'An e-commerce website designed to provide a complete online shopping experience for users.',
    (SELECT id FROM project_categories WHERE slug = 'ssr-app'),
    'high', 
    'long-term', 
    '3-4 months', 
    4, 
    95, 
    135, 
    40, 
    '2023-11-20', 
    '2023-08-20', 
    'https://github.com/example/ecommerce-website', 
    'https://ecommerce-website-demo.vercel.app'
  ),
  (
    'Virtual Event Platform', 
    'A virtual event platform with video conferencing, live streaming, and event management features.',
    'A virtual event platform designed to provide a seamless and engaging experience for event attendees.',
    (SELECT id FROM project_categories WHERE slug = 'web-app'),
    'high', 
    'long-term', 
    '3-4 months', 
    4, 
    100, 
    150, 
    50, 
    '2023-10-30', 
    '2023-08-25', 
    'https://github.com/example/virtual-event-platform', 
    'https://virtual-event-platform-demo.vercel.app'
  );
-- Seed project technologies
INSERT INTO projects_to_technologies (project_id, technology_id, "primary") VALUES
  -- Project 1
  (1, 1, true),
  (1, 2, true),
  (1, 3, false),
  (1, 4, false),
  (1, 5, false),

  -- Project 2
  (2, 6, true),
  (2, 7, true),
  (2, 8, false),
  (2, 9, false),
  (2, 10, false),

  -- Project 3
  (3, 11, true),
  (3, 12, true),
  (3, 13, false),
  (3, 14, false),
  (3, 3, false),

  -- Project 4
  (4, 15, true),
  (4, 16, true),
  (4, 17, false),
  (4, 18, false),
  (4, 19, false),

  -- Project 5
  (5, 1, true),
  (5, 20, true),
  (5, 2, false),
  (5, 21, false),
  (5, 22, false),

  -- Project 6
  (6, 7, true),
  (6, 23, true),
  (6, 10, false),
  (6, 5, false),
  (6, 24, false),

  -- Project 7
  (7, 25, true),
  (7, 26, true),
  (7, 27, false),
  (7, 28, false),
  (7, 29, false),

  -- Project 8
  (8, 6, true),
  (8, 30, true),
  (8, 19, false),
  (8, 13, false),
  (8, 31, false),

  -- Project 9
  (9, 32, true),
  (9, 33, true),
  (9, 2, false),
  (9, 14, false),
  (9, 34, false),

  -- Project 10
  (10, 35, true),
  (10, 36, true),
  (10, 37, false),
  (10, 21, false),
  (10, 19, false),

  -- Project 11
  (11, 38, true),
  (11, 39, true),
  (11, 40, false),
  (11, 18, false),
  (11, 14, false),

  -- Project 12
  (12, 40, true),
  (12, 26, true),
  (12, 27, false),
  (12, 29, false),
  (12, 5, false),

  -- Project 13
  (13, 41, true),
  (13, 11, true),
  (13, 24, false),
  (13, 9, false),
  (13, 8, false);-- Seed project roles
INSERT INTO projects_to_roles (project_id, role_id, count, specific_skills) VALUES
  -- Project 1 (E-commerce Platform)
  (1, 1, 1, ARRAY['Next.js', 'Tailwind CSS', 'Responsive Design']),
  (1, 2, 1, ARRAY['Node.js', 'PostgreSQL', 'Payment Integration']),
  (1, 3, 1, ARRAY['E-commerce UX', 'User Flow Design']),
  (1, 4, 1, ARRAY['Stripe Integration', 'Cloud Deployment']),
  (1, 5, 1, ARRAY['Payment Security', 'Data Protection']),

  -- Project 2 (Real-time Chat Application)
  (2, 1, 1, ARRAY['React', 'WebSockets', 'State Management']),
  (2, 2, 1, ARRAY['Socket.io', 'Node.js', 'Real-time Communication']),
  (2, 3, 1, ARRAY['Chat App Design', 'Interaction Design']),
  (2, 5, 1, ARRAY['User Authentication', 'Message Encryption']),
  (2, 4, 1, ARRAY['Scalability', 'Cloud Infrastructure']),

  -- Project 3 (Task Management System)
  (3, 1, 1, ARRAY['Vue.js', 'State Management', 'Responsive Design']),
  (3, 2, 1, ARRAY['Nest.js', 'MongoDB', 'API Development']),
  (3, 3, 1, ARRAY['Project Management UI', 'User Workflow']),
  (3, 6, 1, ARRAY['Feature Planning', 'User Research']),
  (3, 7, 1, ARRAY['Automated Testing', 'User Experience Testing']),

  -- Project 4 (Mobile Weather App)
  (4, 8, 2, ARRAY['React Native', 'Flutter', 'Mobile UI']),
  (4, 3, 1, ARRAY['Weather App Design', 'Mobile UX']),
  (4, 12, 1, ARRAY['Weather API Integration', 'Data Visualization']),
  (4, 2, 1, ARRAY['API Aggregation', 'Geolocation Services']),

  -- Project 5 (Blog Platform)
  (5, 1, 1, ARRAY['Next.js', 'Markdown Rendering', 'SEO Optimization']),
  (5, 2, 1, ARRAY['Prisma', 'PostgreSQL', 'Content Management']),
  (5, 9, 1, ARRAY['Blog Content Planning', 'Editorial Strategy']),
  (5, 3, 1, ARRAY['Reading Experience', 'Content Layout']),
  (5, 5, 1, ARRAY['Search Engine Optimization', 'Content Tagging']),

  -- Project 6 (API Gateway Service)
  (6, 2, 2, ARRAY['Microservices', 'API Design', 'System Architecture']),
  (6, 4, 1, ARRAY['Docker', 'Kubernetes', 'Cloud Infrastructure']),
  (6, 5, 1, ARRAY['Authentication', 'Rate Limiting', 'Penetration Testing']),
  (6, 13, 1, ARRAY['Load Balancing', 'Optimization Strategies']),

  -- Project 7 (2D Platformer Game)
  (7, 10, 2, ARRAY['Unity', 'Game Mechanics', 'C# Programming']),
  (7, 11, 1, ARRAY['2D Art', 'Sprite Design', 'Character Animation']),
  (7, 14, 1, ARRAY['Level Design', 'Game Balance', 'Player Experience']),
  (7, 7, 1, ARRAY['Game Testing', 'Bug Tracking']),

  -- Project 8 (Personal Finance Tracker)
  (8, 1, 1, ARRAY['React', 'Data Visualization', 'Financial Dashboard']),
  (8, 2, 1, ARRAY['Python', 'Financial Data Processing', 'Security']),
  (8, 12, 1, ARRAY['Financial Insights', 'Trend Analysis']),
  (8, 3, 1, ARRAY['Financial App Design', 'User-Friendly Interfaces']),
  (8, 5, 1, ARRAY['Financial Data Protection', 'Compliance']),

  -- Project 9 (Health Tracking Application)
  (9, 1, 1, ARRAY['Svelte', 'Responsive Design', 'Interactive Graphs']),
  (9, 2, 1, ARRAY['Flask', 'Data Processing', 'Machine Learning Integration']),
  (9, 3, 1, ARRAY['Health App UX', 'Intuitive Tracking']),
  (9, 6, 1, ARRAY['Health Metrics', 'Predictive Analytics']),
  (9, 8, 1, ARRAY['Cross-Platform Development', 'Mobile Optimization']),

  -- Project 10 (Education Platform)
  (10, 1, 1, ARRAY['Angular', 'Interactive Learning Components']),
  (10, 2, 1, ARRAY['Django', 'Course Management System']),
  (10, 3, 1, ARRAY['Educational Platform Design', 'User Engagement']),
  (10, 9, 1, ARRAY['Curriculum Development', 'Educational Content']),
  (10, 15, 1, ARRAY['Inclusive Design', 'Learning Accessibility']),

  -- Project 11 (Location-based Social Network)
  (11, 8, 2, ARRAY['Kotlin', 'Swift', 'Cross-Platform Development']),
  (11, 2, 1, ARRAY['Geolocation Services', 'Real-time Updates']),
  (11, 3, 1, ARRAY['Social Network Design', 'Map Interface']),
  (11, 12, 1, ARRAY['User Behavior Analysis', 'Location Insights']),

  -- Project 12 (Multiplayer Game)
  (12, 10, 2, ARRAY['Unreal Engine', 'Multiplayer Mechanics']),
  (12, 14, 1, ARRAY['Game Balance', 'Player Interaction Design']),
  (12, 11, 1, ARRAY['Character Modeling', 'Environment Design']),
  (12, 4, 1, ARRAY['Multiplayer Synchronization', 'Low-Latency Networking']),

  -- Project 13 (Distributed Computing Platform)
  (13, 2, 2, ARRAY['Go', 'Rust', 'Distributed Systems']),
  (13, 4, 1, ARRAY['Kubernetes', 'Terraform', 'Cloud Infrastructure']),
  (13, 5, 1, ARRAY['System Security', 'Encryption']),
  (13, 13, 1, ARRAY['System Optimization', 'Scalability Design']);-- Seed project learning outcomes for all 13 projects
INSERT INTO project_learning_outcomes (project_id, outcome) VALUES
  -- Project 1: E-commerce Platform
  (1, 'Understanding of full-stack web application architecture'),
  (1, 'Experience with server-side rendering and SEO optimization'),
  (1, 'Implementation of secure user authentication and authorization'),
  (1, 'Integration with third-party payment processing services'),
  
  -- Project 2: Real-time Chat Application
  (2, 'Real-time communication technologies'),
  (2, 'WebSocket implementation'),
  (2, 'State management in real-time applications'),
  (2, 'Advanced front-end event handling'),
  
  -- Project 3: Task Management System
  (3, 'Understanding of project management workflows'),
  (3, 'Implementing task tracking and assignment systems'),
  (3, 'Building responsive and interactive web applications'),
  (3, 'Designing complex relational database schemas'),
  
  -- Project 4: Mobile Weather App
  (4, 'Mobile app development with React Native'),
  (4, 'Working with geolocation and weather APIs'),
  (4, 'Creating responsive mobile user interfaces'),
  (4, 'Implementing offline data caching strategies'),
  
  -- Project 5: Blog Platform
  (5, 'Content management system design'),
  (5, 'Server-side rendering with Next.js'),
  (5, 'Database design for content storage'),
  (5, 'Implementing advanced search and filtering mechanisms'),
  
  -- Project 6: API Gateway Service
  (6, 'Microservices architecture'),
  (6, 'API security and authentication'),
  (6, 'Implementing rate limiting and access control'),
  (6, 'Service discovery and load balancing techniques'),
  
  -- Project 7: 2D Platformer Game
  (7, 'Game development fundamentals'),
  (7, 'Sprite animation and game mechanics'),
  (7, 'Cross-platform game development'),
  (7, 'Implementing game physics and collision detection'),
  
  -- Project 8: Personal Finance Tracker
  (8, 'Financial data visualization'),
  (8, 'Building data-driven web applications'),
  (8, 'Implementing complex data processing logic'),
  (8, 'Integrating multiple financial data sources'),
  
  -- Project 9: Social Media Dashboard
  (9, 'Complex data aggregation from multiple APIs'),
  (9, 'Real-time data visualization techniques'),
  (9, 'Advanced state management in large-scale applications'),
  (9, 'Implementing user engagement metrics tracking'),
  
  -- Project 10: Machine Learning Image Classifier
  (10, 'Machine learning model integration'),
  (10, 'Deep learning neural network implementation'),
  (10, 'Image preprocessing and data augmentation'),
  (10, 'Building scalable machine learning pipelines'),
  
  -- Project 11: Cryptocurrency Trading Bot
  (11, 'Real-time financial data processing'),
  (11, 'Algorithmic trading strategy implementation'),
  (11, 'Secure API integration with cryptocurrency exchanges'),
  (11, 'Advanced market data analysis techniques'),
  
  -- Project 12: IoT Home Automation System
  (12, 'Internet of Things (IoT) device communication'),
  (12, 'Implementing MQTT protocol'),
  (12, 'Real-time device state management'),
  (12, 'Creating secure IoT device networks'),
  
  -- Project 13: Cloud-Native Distributed Caching System
  (13, 'Distributed systems architecture'),
  (13, 'Implementing efficient caching strategies'),
  (13, 'Performance optimization and scalability'),
  (13, 'Advanced network programming techniques');-- Seed teams
INSERT INTO teams (name, project_id, title, description, long_description, progress, start_date, status) VALUES 
('E-commerce Team', (SELECT id FROM projects WHERE title = 'E-commerce Platform'), 'E-commerce Platform Team', 'Team building an e-commerce platform', 'Developing a full-stack e-commerce platform with shopping cart, payment processing, and user management', 25, '2025-01-15', 'active'),
('Blog Team', (SELECT id FROM projects WHERE title = 'Blog Platform'), 'Blog Platform Team', 'Team creating a modern blog platform', 'Building a scalable blog platform with markdown support, comments, and user authentication', 15, '2025-02-01', 'active'),
('API Gateway Team', (SELECT id FROM projects WHERE title = 'API Gateway Service'), 'API Gateway Service Team', 'Team developing an API gateway service', 'Creating a high-performance API gateway with rate limiting, authentication, and request routing', 30, '2025-01-20', 'finished'),
('Game Development Team', (SELECT id FROM projects WHERE title = '2D Platformer Game'), '2D Platformer Game Team', 'Team building a 2D platformer game', 'Developing a 2D platformer game with physics, animations, and level design', 20, '2025-02-05', 'idle'),
('Finance Tracker Team', (SELECT id FROM projects WHERE title = 'Personal Finance Tracker'), 'Personal Finance Tracker Team', 'Team creating a personal finance tracker', 'Building a personal finance tracker with budgeting, expense tracking, and visualization', 10, '2025-02-10', 'active'),
('Image Compression Team', (SELECT id FROM projects WHERE title = 'Image Compression Tool'), 'Image Compression Tool Team', 'Team developing an image compression tool', 'Creating a fast and efficient image compression tool with various algorithms', 10, '2025-02-10', 'finished'),
('Web Scraper Team', (SELECT id FROM projects WHERE title = 'Web Scraper'), 'Web Scraper Team', 'Team building a web scraper', 'Developing a web scraper with a simple query language for extracting data from web pages', 10, '2025-02-10', 'idle'),
('Chatbot Team', (SELECT id FROM projects WHERE title = 'Chatbot'), 'Chatbot Team', 'Team developing a chatbot', 'Creating a chatbot with natural language processing and integration with messaging platforms', 10, '2025-02-10', 'active'),
('Design Team', (SELECT id FROM projects WHERE title = 'E-commerce Platform'), 'E-commerce Platform Team', 'Team building an e-commerce platform', 'Developing a full-stack e-commerce platform with shopping cart, payment processing, and user management', 25, '2025-01-15', 'finished'),
('Development Team', (SELECT id FROM projects WHERE title = 'Real-time Chat Application'), 'Real-time Chat Application Team', 'Team building a real-time chat application', 'Developing a real-time chat application with user presence indicators and message history', 15, '2025-02-01', 'active'),
('Support Team', (SELECT id FROM projects WHERE title = 'Task Management System'), 'Task Management System Team', 'Team building a task management system', 'Developing a task management system with task tracking, assignments, deadlines, and progress reporting', 15, '2025-02-01', 'active'),
('Research Team', (SELECT id FROM projects WHERE title = 'Mobile Weather App'), 'Mobile Weather App Team', 'Team building a mobile weather app', 'Developing a mobile weather app with current conditions, forecasts, and location-based services', 15, '2025-02-01', 'finished'),
('Testing Team', (SELECT id FROM projects WHERE title = 'Blog Platform'), 'Blog Platform Team', 'Team creating a modern blog platform', 'Building a scalable blog platform with markdown support, comments, and user authentication', 15, '2025-02-01', 'active'),
('QA Team', (SELECT id FROM projects WHERE title = 'API Gateway Service'), 'API Gateway Service Team', 'Team developing an API gateway service', 'Creating a high-performance API gateway with rate limiting, authentication, and request routing', 15, '2025-02-01', 'active'),
('Security Team', (SELECT id FROM projects WHERE title = '2D Platformer Game'), '2D Platformer Game Team', 'Team building a 2D platformer game', 'Developing a 2D platformer game with physics, animations, and level design', 15, '2025-02-01', 'idle'),
('Deployment Team', (SELECT id FROM projects WHERE title = 'Personal Finance Tracker'), 'Personal Finance Tracker Team', 'Team creating a personal finance tracker', 'Building a personal finance tracker with budgeting, expense tracking, and visualization', 15, '2025-02-01', 'finished'),
('Documentation Team', (SELECT id FROM projects WHERE title = 'Image Compression Tool'), 'Image Compression Tool Team', 'Team developing an image compression tool', 'Creating a fast and efficient image compression tool with various algorithms', 15, '2025-02-01', 'active'),
('Analytics Team', (SELECT id FROM projects WHERE title = 'Web Scraper'), 'Web Scraper Team', 'Team building a web scraper', 'Developing a web scraper with a simple query language for extracting data from web pages', 15, '2025-02-01', 'active'),
('Content Team Omega', (SELECT id FROM projects WHERE title = 'Chatbot'), 'Chatbot Team', 'Team developing a chatbot', 'Creating a chatbot with natural language processing and integration with messaging platforms', 15, '2025-02-01', 'idle'),
('Design Team Beta', (SELECT id FROM projects WHERE title = 'E-commerce Platform'), 'E-commerce Platform Team', 'Team building an e-commerce platform', 'Developing a full-stack e-commerce platform with shopping cart, payment processing, and user management', 25, '2025-01-15', 'finished'),
('Testing Team Beta', (SELECT id FROM projects WHERE title = 'Real-time Chat Application'), 'Real-time Chat Application Team', 'Team building a real-time chat application', 'Developing a real-time chat application with user presence indicators and message history', 15, '2025-02-01', 'finished'),
('Support Team Beta', (SELECT id FROM projects WHERE title = 'Task Management System'), 'Task Management System Team', 'Team building a task management system', 'Developing a task management system with task tracking, assignments, deadlines, and progress reporting', 15, '2025-02-01', 'active'),
('QA Team Alpha', (SELECT id FROM projects WHERE title = 'API Gateway Service'), 'API Gateway Service Team', 'Team developing an API gateway service', 'Creating a high-performance API gateway with rate limiting, authentication, and request routing', 15, '2025-02-01', 'finished');
-- Link artifacts to projects randomly
INSERT INTO artifacts_to_projects (artifact_id, project_id, added_at) VALUES 
-- Artifact 1 distributed to multiple projects
(1, 1, NOW()),  -- E-commerce Platform
(1, 5, NOW()),  -- Blog Platform
(1, 6, NOW()),  -- API Gateway Service

-- Artifact 2 distributed
(2, 3, NOW()),  -- Task Management System
(2, 2, NOW()),  -- Real-time Chat Application

-- Artifact 3 distributed
(3, 9, NOW()),  -- Social Media Dashboard
(3, 2, NOW()),  -- Real-time Chat Application

-- Artifact 4 distributed
(4, 4, NOW()),  -- Mobile Weather App
(4, 12, NOW()), -- IoT Home Automation System

-- Artifact 5 distributed
(5, 8, NOW()),  -- Personal Finance Tracker
(5, 11, NOW()), -- Cryptocurrency Trading Bot

-- Artifact 6 distributed
(6, 1, NOW()),  -- E-commerce Platform
(6, 5, NOW()),  -- Blog Platform

-- Artifact 7 distributed
(7, 5, NOW()),  -- Blog Platform
(7, 1, NOW()),  -- E-commerce Platform
(7, 13, NOW()), -- Cloud-Native Distributed Caching System

-- Artifact 8 distributed
(8, 1, NOW()),  -- E-commerce Platform
(8, 6, NOW()),  -- API Gateway Service

-- Artifact 9 distributed
(9, 10, NOW()), -- Machine Learning Image Classifier
(9, 13, NOW()), -- Cloud-Native Distributed Caching System

-- Artifact 10 distributed
(10, 12, NOW()), -- IoT Home Automation System
(10, 4, NOW()),  -- Mobile Weather App

-- Artifact 11 distributed
(11, 11, NOW()), -- Cryptocurrency Trading Bot
(11, 2, NOW()),  -- Real-time Chat Application

-- Artifact 12 distributed
(12, 2, NOW()),   -- Real-time Chat Application
(12, 9, NOW()),   -- Social Media Dashboard

-- Artifact 13 distributed
(13, 5, NOW()),   -- Blog Platform
(13, 8, NOW()),   -- Personal Finance Tracker

-- Artifact 14 distributed
(14, 8, NOW()),   -- Personal Finance Tracker
(14, 11, NOW()),  -- Cryptocurrency Trading Bot

-- Artifact 15 distributed
(15, 7, NOW()),   -- 2D Platformer Game
(15, 10, NOW()),  -- Machine Learning Image Classifier

-- Artifact 16 distributed
(16, 1, NOW()),   -- E-commerce Platform
(16, 13, NOW()),  -- Cloud-Native Distributed Caching System

-- Artifact 17 distributed
(17, 6, NOW()),   -- API Gateway Service
(17, 12, NOW()),  -- IoT Home Automation System

-- Artifact 18 distributed
(18, 9, NOW()),   -- Social Media Dashboard
(18, 2, NOW()),   -- Real-time Chat Application

-- Artifact 19 distributed
(19, 1, NOW()),   -- E-commerce Platform
(19, 11, NOW()),  -- Cryptocurrency Trading Bot

-- Artifact 20 distributed
(20, 9, NOW()),   -- Social Media Dashboard
(20, 5, NOW());   -- Blog Platform-- Seed users
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
  (1, 1, 'Frontend Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a frontend developer', 'frontend', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (2, 2, 'Backend Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a backend developer', 'backend', 'linkedin', 'twitter', 'website', 'idle', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (3, 3, 'Full Stack Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a full stack developer', 'fullstack', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (4, 4, 'Designer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a designer', 'designer', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (5, 5, 'Project Manager', '/placeholder.svg?height=200&width=200', 'New York', 'I am a project manager', 'pm', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (6, 6, 'DevOps Engineer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a devops engineer', 'devops', 'linkedin', 'twitter', 'website', 'idle', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (7, 7, 'Data Scientist', '/placeholder.svg?height=200&width=200', 'New York', 'I am a data scientist', 'data', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (8, 8, 'QA Engineer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a qa engineer', 'qa', 'linkedin', 'twitter', 'website', 'not available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (9, 9, 'UI/UX Designer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a ui/ux designer', 'ui', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (10, 10, 'Mobile Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a mobile developer', 'mobile', 'linkedin', 'twitter', 'website', 'idle', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (11, 11, 'Full Stack Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a full stack developer', 'fullstack', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (12, 12, 'Designer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a designer', 'designer', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (13, 13, 'Project Manager', '/placeholder.svg?height=200&width=200', 'New York', 'I am a project manager', 'pm', 'linkedin', 'twitter', 'website', 'idle', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (14, 14, 'DevOps Engineer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a devops engineer', 'devops', 'linkedin', 'twitter', 'website', 'not available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (15, 15, 'Data Scientist', '/placeholder.svg?height=200&width=200', 'New York', 'I am a data scientist', 'data', 'linkedin', 'twitter', 'website', 'idle', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (16, 16, 'QA Engineer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a qa engineer', 'qa', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (17, 17, 'UI/UX Designer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a ui/ux designer', 'ui', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (18, 18, 'Mobile Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a mobile developer', 'mobile', 'linkedin', 'twitter', 'website', 'idle', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (19, 19, 'Full Stack Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a full stack developer', 'fullstack', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (20, 20, 'Designer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a designer', 'designer', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (21, 21, 'Project Manager', '/placeholder.svg?height=200&width=200', 'New York', 'I am a project manager', 'pm', 'linkedin', 'twitter', 'website', 'not available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (22, 22, 'DevOps Engineer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a devops engineer', 'devops', 'linkedin', 'twitter', 'website', 'idle', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (23, 23, 'Data Scientist', '/placeholder.svg?height=200&width=200', 'New York', 'I am a data scientist', 'data', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (24, 24, 'QA Engineer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a qa engineer', 'qa', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (25, 25, 'UI/UX Designer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a ui/ux designer', 'ui', 'linkedin', 'twitter', 'website', 'available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00'),
  (26, 26, 'Mobile Developer', '/placeholder.svg?height=200&width=200', 'New York', 'I am a mobile developer', 'mobile', 'linkedin', 'twitter', 'website', 'not available', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-01-01 00:00:00');-- Seed user_stats with static mock values
INSERT INTO "user_stats" ("user_id", "projects_completed", "teams_led", "artifacts_created", "contributions", "rating")
VALUES
  (1, 5, 2, 10, 5, 8),
  (2, 8, 3, 15, 8, 9),
  (3, 3, 1, 5, 3, 7),
  (4, 2, 1, 3, 2, 6),
  (5, 9, 4, 18, 9, 10),
  (6, 1, 1, 2, 1, 5),
  (7, 6, 2, 12, 6, 8),
  (8, 4, 2, 8, 4, 7),
  (9, 7, 3, 14, 7, 9),
  (10, 10, 5, 20, 10, 10),
  (11, 3, 1, 6, 3, 7),
  (12, 2, 1, 4, 2, 6),
  (13, 5, 2, 10, 5, 8),
  (14, 8, 3, 15, 8, 9),
  (15, 3, 1, 6, 3, 7),
  (16, 2, 1, 4, 2, 6),
  (17, 5, 2, 10, 5, 8),
  (18, 8, 3, 15, 8, 9),
  (19, 3, 1, 6, 3, 7),
  (20, 2, 1, 4, 2, 6),
  (21, 5, 2, 10, 5, 8),
  (22, 8, 3, 15, 8, 9),
  (23, 3, 1, 6, 3, 7),
  (24, 2, 1, 4, 2, 6),
  (25, 5, 2, 10, 5, 8),
  (26, 8, 3, 15, 8, 9);-- Seed users_to_technologies with static mock values
INSERT INTO "users_to_technologies" ("user_id", "technology_id")
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (2, 1),
  (2, 5),
  (2, 6),
  (2, 7),
  (2, 8),
  (2, 9),
  (2, 10),
  (3, 11),
  (3, 12),
  (3, 13),
  (3, 14),
  (3, 15),
  (4, 16),
  (4, 17),
  (4, 18),
  (4, 19),
  (4, 20),
  (4, 21),
  (5, 1),
  (5, 2),
  (5, 3),
  (5, 4),
  (5, 5),
  (5, 6),
  (5, 7),
  (5, 8),
  (5, 9),
  (5, 10),
  (6, 11),
  (6, 12),
  (6, 13),
  (6, 14),
  (6, 15),
  (7, 16),
  (7, 17),
  (7, 18),
  (7, 19),
  (7, 20),
  (7, 21),
  (8, 1),
  (8, 2),
  (8, 3),
  (8, 4),
  (8, 5),
  (8, 6),
  (8, 7),
  (8, 8),
  (8, 9),
  (8, 10),
  (9, 11),
  (9, 12),
  (9, 13),
  (9, 14),
  (9, 15),
  (10, 16),
  (10, 17),
  (10, 18),
  (10, 19),
  (10, 20),
  (10, 21),
  (11, 1),
  (11, 2),
  (11, 3),
  (11, 4),
  (11, 5),
  (11, 6),
  (11, 7),
  (11, 8),
  (11, 9),
  (11, 10),
  (12, 11),
  (12, 12),
  (12, 13),
  (12, 14),
  (12, 15),
  (13, 16),
  (13, 17),
  (13, 18),
  (13, 19),
  (13, 20),
  (13, 21),
  (14, 1),
  (14, 2),
  (14, 3),
  (14, 4),
  (14, 5),
  (14, 6),
  (14, 7),
  (14, 8),
  (14, 9),
  (14, 10),
  (15, 11),
  (15, 12),
  (15, 13),
  (15, 14),
  (15, 15),
  (16, 16),
  (16, 17),
  (16, 18),
  (16, 19),
  (16, 20),
  (16, 21),
  (17, 1),
  (17, 2),
  (17, 3),
  (17, 4),
  (17, 5),
  (17, 6),
  (17, 7),
  (17, 8),
  (17, 9),
  (17, 10),
  (18, 11),
  (18, 12),
  (18, 13),
  (18, 14),
  (18, 15),
  (19, 16),
  (19, 17),
  (19, 18),
  (19, 19),
  (19, 20),
  (19, 21),
  (20, 1),
  (20, 2),
  (20, 3),
  (20, 4),
  (20, 5),
  (20, 6),
  (20, 7),
  (20, 8),
  (20, 9),
  (20, 10),
  (21, 11),
  (21, 12),
  (21, 13),
  (21, 14),
  (21, 15),
  (22, 16),
  (22, 17),
  (22, 18),
  (22, 19),
  (22, 20),
  (22, 21),
  (23, 1),
  (23, 2),
  (23, 3),
  (23, 4),
  (23, 5),
  (23, 6),
  (23, 7),
  (23, 8),
  (23, 9),
  (23, 10),
  (24, 11),
  (24, 12),
  (24, 13),
  (24, 14),
  (24, 15),
  (25, 16),
  (25, 17),
  (25, 18),
  (25, 19),
  (25, 20),
  (25, 21);-- Seed users_to_teams with static mock values
INSERT INTO users_to_teams (user_id, team_id, role, join_date, status) VALUES
(7, 1, 'Owner', '2024-02-15', 'active'),
(13, 1, 'Admin', '2024-02-16', 'active'),
(19, 1, 'Member', '2024-02-17', 'active'),
(24, 1, 'Member', '2024-02-18', 'active'),

(2, 2, 'Owner', '2024-03-01', 'active'),
(11, 2, 'Admin', '2024-03-02', 'active'),
(17, 2, 'Member', '2024-03-03', 'active'),

(5, 3, 'Owner', '2024-01-10', 'active'),
(14, 3, 'Admin', '2024-01-11', 'active'),
(22, 3, 'Member', '2024-01-12', 'active'),
(26, 3, 'Member', '2024-01-13', 'inactive'),

(1, 4, 'Owner', '2024-04-05', 'active'),
(9, 4, 'Admin', '2024-04-06', 'active'),
(16, 4, 'Member', '2024-04-07', 'pending'),

(8, 5, 'Owner', '2024-02-01', 'active'),
(15, 5, 'Admin', '2024-02-02', 'active'),
(20, 5, 'Member', '2024-02-03', 'active'),
(23, 5, 'Member', '2024-02-04', 'inactive'),
(25, 5, 'Member', '2024-02-05', 'active'),

(3, 6, 'Owner', '2024-03-15', 'active'),
(12, 6, 'Admin', '2024-03-16', 'active'),
(18, 6, 'Member', '2024-03-17', 'active'),
(21, 6, 'Member', '2024-03-18', 'pending'),

(6, 7, 'Owner', '2024-01-20', 'active'),
(10, 7, 'Admin', '2024-01-21', 'active'),
(4, 7, 'Member', '2024-01-22', 'active'),

(19, 8, 'Owner', '2024-04-10', 'active'),
(2, 8, 'Admin', '2024-04-11', 'active'),
(13, 8, 'Member', '2024-04-12', 'active'),

(24, 9, 'Owner', '2024-02-10', 'active'),
(7, 9, 'Admin', '2024-02-11', 'active'),
(16, 9, 'Member', '2024-02-12', 'active'),
(22, 9, 'Member', '2024-02-13', 'pending'),

(5, 10, 'Owner', '2024-03-05', 'active'),
(14, 10, 'Admin', '2024-03-06', 'active'),
(20, 10, 'Member', '2024-03-07', 'active'),
(26, 10, 'Member', '2024-03-08', 'inactive'),

(1, 11, 'Owner', '2024-01-15', 'active'),
(9, 11, 'Admin', '2024-01-16', 'active'),
(17, 11, 'Member', '2024-01-17', 'active'),

(11, 12, 'Owner', '2024-04-15', 'active'),
(23, 12, 'Admin', '2024-04-16', 'active'),
(3, 12, 'Member', '2024-04-17', 'pending'),
(15, 12, 'Member', '2024-04-18', 'active'),

(8, 13, 'Owner', '2024-02-20', 'active'),
(18, 13, 'Admin', '2024-02-21', 'active'),
(4, 13, 'Member', '2024-02-22', 'active'),
(12, 13, 'Member', '2024-02-23', 'inactive'),
(25, 13, 'Member', '2024-02-24', 'active'),

(6, 14, 'Owner', '2024-03-10', 'active'),
(21, 14, 'Admin', '2024-03-11', 'active'),
(10, 14, 'Member', '2024-03-12', 'active'),

(16, 15, 'Owner', '2024-01-25', 'active'),
(2, 15, 'Admin', '2024-01-26', 'active'),
(19, 15, 'Member', '2024-01-27', 'active'),

(13, 16, 'Owner', '2024-04-20', 'active'),
(7, 16, 'Admin', '2024-04-21', 'active'),
(22, 16, 'Member', '2024-04-22', 'active'),
(25, 16, 'Member', '2024-04-23', 'pending'),

(5, 17, 'Owner', '2024-02-25', 'active'),
(14, 17, 'Admin', '2024-02-26', 'active'),
(20, 17, 'Member', '2024-02-27', 'active'),
(26, 17, 'Member', '2024-02-28', 'pending'),

(1, 18, 'Owner', '2024-03-20', 'active'),
(11, 18, 'Admin', '2024-03-21', 'active'),
(17, 18, 'Member', '2024-03-22', 'active'),
(23, 18, 'Member', '2024-03-23', 'inactive'),
(8, 18, 'Member', '2024-03-24', 'active'),

(15, 19, 'Owner', '2024-01-30', 'active'),
(3, 19, 'Admin', '2024-01-31', 'active'),
(12, 19, 'Member', '2024-02-01', 'active'),

(21, 20, 'Owner', '2024-04-25', 'active'),
(9, 20, 'Admin', '2024-04-26', 'active'),
(4, 20, 'Member', '2024-04-27', 'pending'),
(18, 20, 'Member', '2024-04-28', 'active'),

(6, 21, 'Owner', '2024-02-28', 'active'),
(24, 21, 'Admin', '2024-02-29', 'active'),
(10, 21, 'Member', '2024-03-01', 'active'),
(16, 21, 'Member', '2024-03-02', 'inactive'),

(13, 22, 'Owner', '2024-03-25', 'active'),
(2, 22, 'Admin', '2024-03-26', 'active'),
(20, 22, 'Member', '2024-03-27', 'active'),
(25, 22, 'Member', '2024-03-28', 'pending'),

(7, 23, 'Owner', '2024-01-05', 'active'),
(19, 23, 'Admin', '2024-01-06', 'active'),
(11, 23, 'Member', '2024-01-07', 'active'),
(22, 23, 'Member', '2024-01-08', 'inactive'),
(15, 23, 'Member', '2024-01-09', 'active');