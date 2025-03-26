-- Link artifacts to projects randomly
INSERT INTO artifacts_to_projects (artifact_id, project_id, added_at) VALUES 
-- Artifact 1 distributed to multiple projects
(1, 1, NOW()),  -- E-commerce Platform
(1, 5, NOW()),  -- Blog Platform
(1, 6, NOW()),  -- API Gateway Service

-- Artifact 2 distributed
(2, 3, NOW()),  -- Task Management System
(2, 2, NOW()),  -- Real-time Chat Application

-- Artifact 3 distributed
(3, 9, NOW()),  -- Social Media Dashboard
(3, 2, NOW()),  -- Real-time Chat Application

-- Artifact 4 distributed
(4, 4, NOW()),  -- Mobile Weather App
(4, 12, NOW()), -- IoT Home Automation System

-- Artifact 5 distributed
(5, 8, NOW()),  -- Personal Finance Tracker
(5, 11, NOW()), -- Cryptocurrency Trading Bot

-- Artifact 6 distributed
(6, 1, NOW()),  -- E-commerce Platform
(6, 5, NOW()),  -- Blog Platform

-- Artifact 7 distributed
(7, 5, NOW()),  -- Blog Platform
(7, 1, NOW()),  -- E-commerce Platform
(7, 13, NOW()), -- Cloud-Native Distributed Caching System

-- Artifact 8 distributed
(8, 1, NOW()),  -- E-commerce Platform
(8, 6, NOW()),  -- API Gateway Service

-- Artifact 9 distributed
(9, 10, NOW()), -- Machine Learning Image Classifier
(9, 13, NOW()), -- Cloud-Native Distributed Caching System

-- Artifact 10 distributed
(10, 12, NOW()), -- IoT Home Automation System
(10, 4, NOW()),  -- Mobile Weather App

-- Artifact 11 distributed
(11, 11, NOW()), -- Cryptocurrency Trading Bot
(11, 2, NOW()),  -- Real-time Chat Application

-- Artifact 12 distributed
(12, 2, NOW()),   -- Real-time Chat Application
(12, 9, NOW()),   -- Social Media Dashboard

-- Artifact 13 distributed
(13, 5, NOW()),   -- Blog Platform
(13, 8, NOW()),   -- Personal Finance Tracker

-- Artifact 14 distributed
(14, 8, NOW()),   -- Personal Finance Tracker
(14, 11, NOW()),  -- Cryptocurrency Trading Bot

-- Artifact 15 distributed
(15, 7, NOW()),   -- 2D Platformer Game
(15, 10, NOW()),  -- Machine Learning Image Classifier

-- Artifact 16 distributed
(16, 1, NOW()),   -- E-commerce Platform
(16, 13, NOW()),  -- Cloud-Native Distributed Caching System

-- Artifact 17 distributed
(17, 6, NOW()),   -- API Gateway Service
(17, 12, NOW()),  -- IoT Home Automation System

-- Artifact 18 distributed
(18, 9, NOW()),   -- Social Media Dashboard
(18, 2, NOW()),   -- Real-time Chat Application

-- Artifact 19 distributed
(19, 1, NOW()),   -- E-commerce Platform
(19, 11, NOW()),  -- Cryptocurrency Trading Bot

-- Artifact 20 distributed
(20, 9, NOW()),   -- Social Media Dashboard
(20, 5, NOW());   -- Blog Platform