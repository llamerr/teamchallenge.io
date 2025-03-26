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
);