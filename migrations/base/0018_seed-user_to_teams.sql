-- Seed users_to_teams with static mock values
INSERT INTO users_to_teams (user_id, team_id, role, join_date, status) VALUES
(7, 1, 'Owner', '2024-02-15', 'active'),
(13, 1, 'Admin', '2024-02-16', 'active'),
(19, 1, 'Member', '2024-02-17', 'active'),
(24, 1, 'Member', '2024-02-18', 'active'),

(2, 2, 'Owner', '2024-03-01', 'active'),
(11, 2, 'Admin', '2024-03-02', 'active'),
(17, 2, 'Member', '2024-03-03', 'active'),

(5, 3, 'Owner', '2024-01-10', 'active'),
(14, 3, 'Admin', '2024-01-11', 'active'),
(22, 3, 'Member', '2024-01-12', 'active'),
(26, 3, 'Member', '2024-01-13', 'inactive'),

(1, 4, 'Owner', '2024-04-05', 'active'),
(9, 4, 'Admin', '2024-04-06', 'active'),
(16, 4, 'Member', '2024-04-07', 'pending'),

(8, 5, 'Owner', '2024-02-01', 'active'),
(15, 5, 'Admin', '2024-02-02', 'active'),
(20, 5, 'Member', '2024-02-03', 'active'),
(23, 5, 'Member', '2024-02-04', 'inactive'),
(25, 5, 'Member', '2024-02-05', 'active'),

(3, 6, 'Owner', '2024-03-15', 'active'),
(12, 6, 'Admin', '2024-03-16', 'active'),
(18, 6, 'Member', '2024-03-17', 'active'),
(21, 6, 'Member', '2024-03-18', 'pending'),

(6, 7, 'Owner', '2024-01-20', 'active'),
(10, 7, 'Admin', '2024-01-21', 'active'),
(4, 7, 'Member', '2024-01-22', 'active'),

(19, 8, 'Owner', '2024-04-10', 'active'),
(2, 8, 'Admin', '2024-04-11', 'active'),
(13, 8, 'Member', '2024-04-12', 'active'),

(24, 9, 'Owner', '2024-02-10', 'active'),
(7, 9, 'Admin', '2024-02-11', 'active'),
(16, 9, 'Member', '2024-02-12', 'active'),
(22, 9, 'Member', '2024-02-13', 'pending'),

(5, 10, 'Owner', '2024-03-05', 'active'),
(14, 10, 'Admin', '2024-03-06', 'active'),
(20, 10, 'Member', '2024-03-07', 'active'),
(26, 10, 'Member', '2024-03-08', 'inactive'),

(1, 11, 'Owner', '2024-01-15', 'active'),
(9, 11, 'Admin', '2024-01-16', 'active'),
(17, 11, 'Member', '2024-01-17', 'active'),

(11, 12, 'Owner', '2024-04-15', 'active'),
(23, 12, 'Admin', '2024-04-16', 'active'),
(3, 12, 'Member', '2024-04-17', 'pending'),
(15, 12, 'Member', '2024-04-18', 'active'),

(8, 13, 'Owner', '2024-02-20', 'active'),
(18, 13, 'Admin', '2024-02-21', 'active'),
(4, 13, 'Member', '2024-02-22', 'active'),
(12, 13, 'Member', '2024-02-23', 'inactive'),
(25, 13, 'Member', '2024-02-24', 'active'),

(6, 14, 'Owner', '2024-03-10', 'active'),
(21, 14, 'Admin', '2024-03-11', 'active'),
(10, 14, 'Member', '2024-03-12', 'active'),

(16, 15, 'Owner', '2024-01-25', 'active'),
(2, 15, 'Admin', '2024-01-26', 'active'),
(19, 15, 'Member', '2024-01-27', 'active'),

(13, 16, 'Owner', '2024-04-20', 'active'),
(7, 16, 'Admin', '2024-04-21', 'active'),
(22, 16, 'Member', '2024-04-22', 'active'),
(25, 16, 'Member', '2024-04-23', 'pending'),

(5, 17, 'Owner', '2024-02-25', 'active'),
(14, 17, 'Admin', '2024-02-26', 'active'),
(20, 17, 'Member', '2024-02-27', 'active'),
(26, 17, 'Member', '2024-02-28', 'pending'),

(1, 18, 'Owner', '2024-03-20', 'active'),
(11, 18, 'Admin', '2024-03-21', 'active'),
(17, 18, 'Member', '2024-03-22', 'active'),
(23, 18, 'Member', '2024-03-23', 'inactive'),
(8, 18, 'Member', '2024-03-24', 'active'),

(15, 19, 'Owner', '2024-01-30', 'active'),
(3, 19, 'Admin', '2024-01-31', 'active'),
(12, 19, 'Member', '2024-02-01', 'active'),

(21, 20, 'Owner', '2024-04-25', 'active'),
(9, 20, 'Admin', '2024-04-26', 'active'),
(4, 20, 'Member', '2024-04-27', 'pending'),
(18, 20, 'Member', '2024-04-28', 'active'),

(6, 21, 'Owner', '2024-02-28', 'active'),
(24, 21, 'Admin', '2024-02-29', 'active'),
(10, 21, 'Member', '2024-03-01', 'active'),
(16, 21, 'Member', '2024-03-02', 'inactive'),

(13, 22, 'Owner', '2024-03-25', 'active'),
(2, 22, 'Admin', '2024-03-26', 'active'),
(20, 22, 'Member', '2024-03-27', 'active'),
(25, 22, 'Member', '2024-03-28', 'pending'),

(7, 23, 'Owner', '2024-01-05', 'active'),
(19, 23, 'Admin', '2024-01-06', 'active'),
(11, 23, 'Member', '2024-01-07', 'active'),
(22, 23, 'Member', '2024-01-08', 'inactive'),
(15, 23, 'Member', '2024-01-09', 'active');