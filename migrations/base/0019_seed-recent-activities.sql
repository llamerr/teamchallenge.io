-- Seed recent activities with comprehensive mock values for 23 teams
INSERT INTO recent_activities (id, team_id, type, "user", action, "date", details) VALUES
-- Project 1: E-commerce Platform
(1, 1, 'created', 'john.doe@company.com', 'Initiated E-commerce Platform development', '2024-02-15', 'Project kickoff meeting held, initial requirements discussed'),
(2, 1, 'updated', 'sarah.smith@company.com', 'Completed initial database schema design', '2024-02-20', 'Finalized database structure for product, user, and order tables'),
(3, 1, 'added', 'mike.chen@company.com', 'Integrated payment gateway artifact', '2024-02-25', 'Implemented Stripe payment integration with test credentials'),
(4, 1, 'deployed', 'emma.wilson@company.com', 'Created staging environment', '2024-03-01', 'Set up AWS staging infrastructure with CI/CD pipeline'),
(5, 1, 'reviewed', 'david.garcia@company.com', 'Conducted first security audit', '2024-03-05', 'Performed initial vulnerability assessment and penetration testing'),

-- Project 2: Mobile Banking App
(6, 2, 'created', 'anna.martinez@company.com', 'Initiated Mobile Banking App development', '2024-02-10', 'Project initiation and requirements gathering completed'),
(7, 2, 'updated', 'robert.kim@company.com', 'Finalized UI/UX design', '2024-02-22', 'Completed wireframes and user flow diagrams'),
(8, 2, 'added', 'lisa.wong@company.com', 'Implemented biometric authentication', '2024-03-01', 'Integrated Face ID and fingerprint login mechanisms'),
(9, 2, 'deployed', 'carlos.rodriguez@company.com', 'Set up development environment', '2024-03-10', 'Configured React Native and backend services'),
(10, 2, 'reviewed', 'sophia.lee@company.com', 'Conducted initial code review', '2024-03-15', 'Performed static code analysis and provided improvement recommendations'),

-- Project 3: Healthcare Management System
(11, 3, 'created', 'james.anderson@company.com', 'Initiated Healthcare Management System', '2024-02-05', 'Project charter approved, initial stakeholder meetings completed'),
(12, 3, 'updated', 'olivia.taylor@company.com', 'Developed patient record module', '2024-02-18', 'Implemented secure patient data storage and retrieval'),
(13, 3, 'added', 'ethan.brown@company.com', 'Integrated HIPAA compliance checks', '2024-02-28', 'Added data protection and privacy validation layers'),
(14, 3, 'deployed', 'ava.martinez@company.com', 'Created test environment', '2024-03-08', 'Set up isolated testing infrastructure with mock data'),
(15, 3, 'reviewed', 'noah.wilson@company.com', 'Conducted compliance review', '2024-03-20', 'Verified HIPAA and GDPR compliance measures'),

-- Project 4: AI Recommendation Engine
(16, 4, 'created', 'lucas.park@company.com', 'Initiated AI Recommendation Engine', '2024-02-12', 'Initial machine learning model design and data preprocessing'),
(17, 4, 'updated', 'emily.chen@company.com', 'Developed initial recommendation algorithm', '2024-02-25', 'Implemented collaborative filtering technique'),
(18, 4, 'added', 'alex.wong@company.com', 'Integrated machine learning pipeline', '2024-03-05', 'Set up data training and model evaluation framework'),
(19, 4, 'deployed', 'rachel.kim@company.com', 'Created ML model staging environment', '2024-03-15', 'Configured GPU-accelerated training infrastructure'),
(20, 4, 'reviewed', 'michael.lee@company.com', 'Conducted model performance assessment', '2024-03-22', 'Analyzed accuracy, precision, and recall metrics'),

-- Project 5: Blockchain Supply Chain Tracking
(21, 5, 'created', 'emma.johnson@company.com', 'Initiated Blockchain Supply Chain Project', '2024-02-08', 'Project scope defined, blockchain architecture outlined'),
(22, 5, 'updated', 'daniel.martinez@company.com', 'Developed smart contract prototypes', '2024-02-20', 'Created initial Ethereum-based smart contract templates'),
(23, 5, 'added', 'sophia.rodriguez@company.com', 'Integrated transaction verification module', '2024-03-02', 'Implemented cryptographic validation mechanisms'),
(24, 5, 'deployed', 'ryan.chen@company.com', 'Set up private blockchain network', '2024-03-12', 'Configured Hyperledger Fabric test network'),
(25, 5, 'reviewed', 'olivia.wang@company.com', 'Conducted security vulnerability assessment', '2024-03-25', 'Performed comprehensive blockchain security audit'),

-- Project 6: IoT Device Management Platform
(26, 6, 'created', 'alex.zhang@company.com', 'Initiated IoT Device Management Platform', '2024-02-15', 'Project kickoff, defined IoT ecosystem architecture'),
(27, 6, 'updated', 'karen.wilson@company.com', 'Developed device connectivity framework', '2024-02-28', 'Implemented MQTT protocol communication layer'),
(28, 6, 'added', 'tom.kim@company.com', 'Integrated device provisioning system', '2024-03-10', 'Created secure device registration and authentication mechanism'),
(29, 6, 'deployed', 'jessica.martinez@company.com', 'Created IoT device simulation environment', '2024-03-18', 'Set up scalable device emulation infrastructure'),
(30, 6, 'reviewed', 'michael.garcia@company.com', 'Conducted network protocol review', '2024-03-28', 'Analyzed communication efficiency and security protocols'),

-- Project 7: Cloud Migration Project
(31, 7, 'created', 'rachel.lee@company.com', 'Initiated Enterprise Cloud Migration', '2024-02-10', 'Comprehensive cloud strategy development'),
(32, 7, 'updated', 'david.wong@company.com', 'Completed infrastructure assessment', '2024-02-22', 'Mapped existing infrastructure for cloud transition'),
(33, 7, 'added', 'emma.taylor@company.com', 'Developed migration strategy document', '2024-03-05', 'Created detailed migration plan and risk mitigation strategies'),
(34, 7, 'deployed', 'lucas.rodriguez@company.com', 'Initiated first phase of cloud migration', '2024-03-15', 'Migrated non-critical applications to AWS'),
(35, 7, 'reviewed', 'sophia.chen@company.com', 'Conducted cloud architecture review', '2024-03-25', 'Evaluated cloud infrastructure design and scalability'),

-- Project 8: Cybersecurity Enhancement Initiative
(36, 8, 'created', 'michael.chen@company.com', 'Initiated Cybersecurity Enhancement Project', '2024-02-12', 'Comprehensive security strategy development'),
(37, 8, 'updated', 'anna.wilson@company.com', 'Developed security assessment framework', '2024-02-26', 'Created comprehensive security vulnerability scanning tools'),
(38, 8, 'added', 'james.martinez@company.com', 'Integrated advanced threat detection system', '2024-03-08', 'Implemented machine learning-based anomaly detection'),
(39, 8, 'deployed', 'olivia.kim@company.com', 'Set up security operations center (SOC)', '2024-03-18', 'Configured centralized security monitoring infrastructure'),
(40, 8, 'reviewed', 'ryan.garcia@company.com', 'Conducted comprehensive security audit', '2024-03-30', 'Performed in-depth penetration testing and security assessment'),

-- Project 9: Enterprise Resource Planning System
(41, 9, 'created', 'karen.davis@company.com', 'Initiated Enterprise Resource Planning System', '2024-02-08', 'Project initialization and requirements mapping'),
(42, 9, 'updated', 'tom.wilson@company.com', 'Developed core ERP modules', '2024-02-20', 'Implemented finance, HR, and inventory management modules'),
(43, 9, 'added', 'jessica.martinez@company.com', 'Integrated reporting and analytics', '2024-03-03', 'Created comprehensive business intelligence dashboards'),
(44, 9, 'deployed', 'ryan.kim@company.com', 'Set up ERP test environment', '2024-03-12', 'Configured sandbox for system integration testing'),
(45, 9, 'reviewed', 'maria.rodriguez@company.com', 'Conducted system integration review', '2024-03-25', 'Evaluated cross-module functionality and data flow'),

-- Project 10: Customer Relationship Management Upgrade
(46, 10, 'created', 'alex.johnson@company.com', 'Initiated CRM System Upgrade', '2024-02-15', 'Comprehensive CRM enhancement strategy development'),
(47, 10, 'updated', 'emily.martinez@company.com', 'Developed advanced customer segmentation', '2024-02-28', 'Implemented machine learning-based customer profiling'),
(48, 10, 'added', 'daniel.kim@company.com', 'Integrated AI-powered customer insights', '2024-03-10', 'Created predictive analytics for customer behavior'),
(49, 10, 'deployed', 'sophia.wang@company.com', 'Set up CRM cloud infrastructure', '2024-03-20', 'Migrated CRM system to scalable cloud platform'),
(50, 10, 'reviewed', 'michael.rodriguez@company.com', 'Conducted performance and scalability review', '2024-03-30', 'Analyzed system performance under simulated load'),

-- Projects 11-23: Abbreviated entries to complete the 23 teams
(51, 11, 'created', 'jessica.lee@company.com', 'Real-time Analytics Dashboard Project', '2024-02-18', 'Initial project scoping and requirements gathering'),
(52, 12, 'updated', 'ryan.chen@company.com', 'Automated Testing Framework Development', '2024-03-01', 'Continuous integration test suite implementation'),
(53, 13, 'added', 'maria.wilson@company.com', 'Performance Optimization Initiative', '2024-03-10', 'Developed performance monitoring tools'),
(54, 14, 'deployed', 'david.martinez@company.com', 'Machine Learning Model Deployment', '2024-03-15', 'Created model serving infrastructure'),
(55, 15, 'reviewed', 'sophia.kim@company.com', 'Augmented Reality Platform Assessment', '2024-03-22', 'Evaluated AR technology integration'),
(56, 16, 'created', 'tom.garcia@company.com', 'Natural Language Processing Project', '2024-02-25', 'Initial NLP model research and development'),
(57, 17, 'updated', 'emily.rodriguez@company.com', 'Edge Computing Infrastructure', '2024-03-05', 'Developed distributed computing framework'),
(58, 18, 'added', 'michael.wong@company.com', 'Quantum Computing Research', '2024-03-12', 'Implemented quantum algorithm prototypes'),
(59, 19, 'deployed', 'rachel.taylor@company.com', 'Autonomous Vehicle Software Platform', '2024-03-20', 'Created simulation and testing environment'),
(60, 20, 'reviewed', 'alex.chen@company.com', 'Renewable Energy Management System', '2024-03-28', 'Conducted system efficiency analysis'),
(61, 21, 'created', 'olivia.martinez@company.com', 'Genomics Data Analysis Platform', '2024-02-20', 'Initial bioinformatics infrastructure setup'),
(62, 22, 'updated', 'james.kim@company.com', 'Satellite Communication Network', '2024-03-08', 'Developed communication protocol improvements'),
(63, 23, 'added', 'emma.rodriguez@company.com', 'Space Exploration Data Processing', '2024-03-16', 'Implemented advanced data analysis algorithms');