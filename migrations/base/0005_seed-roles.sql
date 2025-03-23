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
