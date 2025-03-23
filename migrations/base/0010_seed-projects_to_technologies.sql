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
