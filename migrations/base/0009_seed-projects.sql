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
