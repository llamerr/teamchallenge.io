-- Seed project roles
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
  (13, 13, 1, ARRAY['System Optimization', 'Scalability Design']);