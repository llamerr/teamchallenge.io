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
  ('Sound Designer', 'Creates audio assets for applications and games', ARRAY['Audio Editing', 'Sound Effects', 'Music Composition'], 1),
  ('Data Analyst', 'Analyzes data to provide insights and recommendations', ARRAY['Data Analysis', 'Statistics', 'Data Visualization'], 1),
  ('Project Manager', 'Oversees project planning, execution, and delivery', ARRAY['Project Planning', 'Resource Management', 'Risk Analysis'], 1),
  ('Business Analyst', 'Analyzes business processes and requirements to inform technical decisions', ARRAY['Business Analysis', 'Requirements Gathering', 'Process Mapping'], 1),
  ('Technical Writer', 'Writes technical documentation and guides for software and hardware products', ARRAY['Technical Writing', 'Documentation', 'User Guides'], 1),
  ('QA Engineer', 'Ensures software quality through testing and quality assurance', ARRAY['Testing', 'Quality Assurance', 'Bug Tracking'], 1),
  ('System Architect', 'Designs and implements system architecture and infrastructure', ARRAY['System Architecture', 'Infrastructure Design', 'Cloud Services'], 1),
  ('Cloud Engineer', 'Manages cloud infrastructure and services', ARRAY['Cloud Services', 'Infrastructure Management', 'Cloud Security'], 1),
  ('Data Engineer', 'Develops and manages data pipelines and data warehouses', ARRAY['Data Engineering', 'Data Processing', 'Data Storage'], 1);
  