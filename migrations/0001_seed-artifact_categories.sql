-- Populate artifact categories
INSERT INTO artifact_categories (slug, name, description, icon) VALUES 
('design-doc', 'Design Document', 'Technical documentation and design specifications', 'file-text'),
('database', 'Database Schema', 'Database design and schema definitions', 'database'),
('ui-design', 'UI Design', 'User interface design files', 'layout'),
('presentation', 'Presentation', 'Pitch decks and presentation materials', 'file');
