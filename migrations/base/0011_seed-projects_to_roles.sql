-- Seed project roles
INSERT INTO projects_to_roles (project_id, role_id, count, specific_skills) VALUES
  -- Project 1 (E-commerce Platform)
  (1, (SELECT id FROM roles WHERE name = 'Frontend Developer'), 1, ARRAY['Next.js', 'Tailwind CSS', 'Responsive Design']),
  (1, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Node.js', 'PostgreSQL', 'Payment Integration']),
  (1, (SELECT id FROM roles WHERE name = 'UI/UX Designer'), 1, ARRAY['E-commerce UX', 'User Flow Design']),
  (1, (SELECT id FROM roles WHERE name = 'DevOps Engineer'), 1, ARRAY['Stripe Integration', 'Cloud Deployment']),
  (1, (SELECT id FROM roles WHERE name = 'Security Specialist'), 1, ARRAY['Payment Security', 'Data Protection']),

  -- Project 2 (Real-time Chat Application)
  (2, (SELECT id FROM roles WHERE name = 'Frontend Developer'), 1, ARRAY['React', 'WebSockets', 'State Management']),
  (2, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Socket.io', 'Node.js', 'Real-time Communication']),
  (2, (SELECT id FROM roles WHERE name = 'UI/UX Designer'), 1, ARRAY['Chat App Design', 'Interaction Design']),
  (2, (SELECT id FROM roles WHERE name = 'Security Specialist'), 1, ARRAY['User Authentication', 'Message Encryption']),
  (2, (SELECT id FROM roles WHERE name = 'DevOps Engineer'), 1, ARRAY['Scalability', 'Cloud Infrastructure']),

  -- Project 3 (Task Management System)
  (3, (SELECT id FROM roles WHERE name = 'Frontend Developer'), 1, ARRAY['Vue.js', 'State Management', 'Responsive Design']),
  (3, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Nest.js', 'MongoDB', 'API Development']),
  (3, (SELECT id FROM roles WHERE name = 'UI/UX Designer'), 1, ARRAY['Project Management UI', 'User Workflow']),
  (3, (SELECT id FROM roles WHERE name = 'Product Manager'), 1, ARRAY['Feature Planning', 'User Research']),
  (3, (SELECT id FROM roles WHERE name = 'QA Specialist'), 1, ARRAY['Automated Testing', 'User Experience Testing']),

  -- Project 4 (Mobile Weather App)
  (4, (SELECT id FROM roles WHERE name = 'Mobile Developer'), 2, ARRAY['React Native', 'Flutter', 'Mobile UI']),
  (4, (SELECT id FROM roles WHERE name = 'UI/UX Designer'), 1, ARRAY['Weather App Design', 'Mobile UX']),
  (4, (SELECT id FROM roles WHERE name = 'Data Analyst'), 1, ARRAY['Weather API Integration', 'Data Visualization']),
  (4, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['API Aggregation', 'Geolocation Services']),

  -- Project 5 (Blog Platform)
  (5, (SELECT id FROM roles WHERE name = 'Frontend Developer'), 1, ARRAY['Next.js', 'Markdown Rendering', 'SEO Optimization']),
  (5, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Prisma', 'PostgreSQL', 'Content Management']),
  (5, (SELECT id FROM roles WHERE name = 'Content Strategist'), 1, ARRAY['Blog Content Planning', 'Editorial Strategy']),
  (5, (SELECT id FROM roles WHERE name = 'UI/UX Designer'), 1, ARRAY['Reading Experience', 'Content Layout']),
  (5, (SELECT id FROM roles WHERE name = 'SEO Specialist'), 1, ARRAY['Search Engine Optimization', 'Content Tagging']),

  -- Project 6 (API Gateway Service)
  (6, (SELECT id FROM roles WHERE name = 'Backend Developer'), 2, ARRAY['Microservices', 'API Design', 'System Architecture']),
  (6, (SELECT id FROM roles WHERE name = 'DevOps Engineer'), 1, ARRAY['Docker', 'Kubernetes', 'Cloud Infrastructure']),
  (6, (SELECT id FROM roles WHERE name = 'Security Specialist'), 1, ARRAY['Authentication', 'Rate Limiting', 'Penetration Testing']),
  (6, (SELECT id FROM roles WHERE name = 'Performance Engineer'), 1, ARRAY['Load Balancing', 'Optimization Strategies']),

  -- Project 7 (2D Platformer Game)
  (7, (SELECT id FROM roles WHERE name = 'Game Developer'), 1, ARRAY['Unity', 'Game Mechanics', 'C# Programming']),
  (7, (SELECT id FROM roles WHERE name = 'Artist'), 1, ARRAY['2D Art', 'Sprite Design', 'Character Animation']),
  (7, (SELECT id FROM roles WHERE name = 'Sound Designer'), 1, ARRAY['Game Audio', 'Sound Effects', 'Music Composition']),
  (7, (SELECT id FROM roles WHERE name = 'Game Designer'), 1, ARRAY['Level Design', 'Game Balance', 'Player Experience']),
  (7, (SELECT id FROM roles WHERE name = 'QA Specialist'), 1, ARRAY['Game Testing', 'Bug Tracking']),

  -- Project 8 (Personal Finance Tracker)
  (8, (SELECT id FROM roles WHERE name = 'Frontend Developer'), 1, ARRAY['React', 'Data Visualization', 'Financial Dashboard']),
  (8, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Python', 'Financial Data Processing', 'Security']),
  (8, (SELECT id FROM roles WHERE name = 'Data Analyst'), 1, ARRAY['Financial Insights', 'Trend Analysis']),
  (8, (SELECT id FROM roles WHERE name = 'UI/UX Designer'), 1, ARRAY['Financial App Design', 'User-Friendly Interfaces']),
  (8, (SELECT id FROM roles WHERE name = 'Security Specialist'), 1, ARRAY['Financial Data Protection', 'Compliance']),

  -- Project 9 (Health Tracking Application)
  (9, (SELECT id FROM roles WHERE name = 'Frontend Developer'), 1, ARRAY['Svelte', 'Responsive Design', 'Interactive Graphs']),
  (9, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Flask', 'Data Processing', 'Machine Learning Integration']),
  (9, (SELECT id FROM roles WHERE name = 'UI/UX Designer'), 1, ARRAY['Health App UX', 'Intuitive Tracking']),
  (9, (SELECT id FROM roles WHERE name = 'Data Scientist'), 1, ARRAY['Health Metrics', 'Predictive Analytics']),
  (9, (SELECT id FROM roles WHERE name = 'Mobile Developer'), 1, ARRAY['Cross-Platform Development', 'Mobile Optimization']),

  -- Project 10 (Education Platform)
  (10, (SELECT id FROM roles WHERE name = 'Frontend Developer'), 1, ARRAY['Angular', 'Interactive Learning Components']),
  (10, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Django', 'Course Management System']),
  (10, (SELECT id FROM roles WHERE name = 'UI/UX Designer'), 1, ARRAY['Educational Platform Design', 'User Engagement']),
  (10, (SELECT id FROM roles WHERE name = 'Content Creator'), 1, ARRAY['Curriculum Development', 'Educational Content']),
  (10, (SELECT id FROM roles WHERE name = 'Accessibility Specialist'), 1, ARRAY['Inclusive Design', 'Learning Accessibility']),

  -- Project 11 (Location-based Social Network)
  (11, (SELECT id FROM roles WHERE name = 'Mobile Developer'), 2, ARRAY['Kotlin', 'Swift', 'Cross-Platform Development']),
  (11, (SELECT id FROM roles WHERE name = 'Backend Developer'), 1, ARRAY['Geolocation Services', 'Real-time Updates']),
  (11, (SELECT id FROM roles WHERE name = 'UI/UX Designer'), 1, ARRAY['Social Network Design', 'Map Interface']),
  (11, (SELECT id FROM roles WHERE name = 'Data Analyst'), 1, ARRAY['User Behavior Analysis', 'Location Insights']),

  -- Project 12 (Multiplayer Game)
  (12, (SELECT id FROM roles WHERE name = 'Game Developer'), 1, ARRAY['Unreal Engine', 'Multiplayer Mechanics']),
  (12, (SELECT id FROM roles WHERE name = 'Game Designer'), 1, ARRAY['Game Balance', 'Player Interaction Design']),
  (12, (SELECT id FROM roles WHERE name = '3D Artist'), 1, ARRAY['Character Modeling', 'Environment Design']),
  (12, (SELECT id FROM roles WHERE name = 'Network Engineer'), 1, ARRAY['Multiplayer Synchronization', 'Low-Latency Networking']),
  (12, (SELECT id FROM roles WHERE name = 'Sound Designer'), 1, ARRAY['Immersive Audio', 'Sound Effects']),

  -- Project 13 (Distributed Computing Platform)
  (13, (SELECT id FROM roles WHERE name = 'Backend Developer'), 2, ARRAY['Go', 'Rust', 'Distributed Systems']),
  (13, (SELECT id FROM roles WHERE name = 'DevOps Engineer'), 1, ARRAY['Kubernetes', 'Terraform', 'Cloud Infrastructure']),
  (13, (SELECT id FROM roles WHERE name = 'Security Specialist'), 1, ARRAY['System Security', 'Encryption']),
  (13, (SELECT id FROM roles WHERE name = 'Performance Engineer'), 1, ARRAY['System Optimization', 'Scalability Design']);