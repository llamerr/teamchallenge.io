-- Link artifacts to projects
INSERT INTO artifacts_to_projects (artifact_id, project_id, added_at) VALUES 
(1, (SELECT id FROM projects WHERE title = 'E-commerce Platform'), NOW()),
(1, (SELECT id FROM projects WHERE title = 'Blog Platform'), NOW()),
(1, (SELECT id FROM projects WHERE title = 'API Gateway Service'), NOW()),
(1, (SELECT id FROM projects WHERE title = '2D Platformer Game'), NOW()),
(1, (SELECT id FROM projects WHERE title = 'Personal Finance Tracker'), NOW());
