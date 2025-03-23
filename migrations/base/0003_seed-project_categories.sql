-- Seed project categories
INSERT INTO project_categories (slug, name, description, icon) VALUES
  ('spa', 'Single Page Application', 'Web applications that dynamically update content without full page reloads', 'code'),
  ('ssr-app', 'Server-Side Rendering Application', 'Web applications rendered on the server for improved performance and SEO', 'shopping-cart'),
  ('mobile', 'Mobile Application', 'Native or cross-platform mobile apps for iOS and Android', 'device-mobile'),
  ('backend', 'Backend Service', 'Server-side services and microservices', 'server'),
  ('game', 'Game Development', 'Video game development across various platforms', 'device-gamepad');
