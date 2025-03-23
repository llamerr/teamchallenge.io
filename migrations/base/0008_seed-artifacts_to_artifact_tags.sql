-- Link tags to artifacts
INSERT INTO artifacts_to_artifact_tags (artifact_id, artifact_tag_id) VALUES 
(1, (SELECT id FROM artifact_tags WHERE name = 'e-commerce')),
(1, (SELECT id FROM artifact_tags WHERE name = 'database')),
(1, (SELECT id FROM artifact_tags WHERE name = 'sql')),
(1, (SELECT id FROM artifact_tags WHERE name = 'schema')),
(1, (SELECT id FROM artifact_tags WHERE name = 'beginner-friendly'));
