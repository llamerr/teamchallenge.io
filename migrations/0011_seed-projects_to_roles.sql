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
