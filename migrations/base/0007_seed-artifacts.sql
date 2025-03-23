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
