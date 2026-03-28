USE projeto2;

-- Users
INSERT INTO users (name, email, status) VALUES
('Alice Santos', 'alice@example.com', 1),
('Bruno Costa', 'bruno@example.com', 1),
('Carla Mendes', 'carla@example.com', 0),
('Diego Lima', 'diego@example.com', 1),
('Eva Rocha', 'eva@example.com', 1);

-- Tags
INSERT INTO tags (name) VALUES
('bug'),
('feature'),
('urgent'),
('backend'),
('frontend'),
('database'),
('documentation');

-- Tasks
INSERT INTO tasks (title, done) VALUES
('Fix login page crash on mobile', 0),
('Add dark mode support', 0),
('Write API documentation', 1),
('Optimize database queries', 0),
('Implement password reset flow', 1),
('Create unit tests for auth module', 0),
('Deploy staging environment', 1),
('Fix broken image uploads', 0),
('Add pagination to user list', 0),
('Update README with setup instructions', 1);

-- Task Tags
INSERT INTO task_tags (taskId, tagId) VALUES
(1, 1),  -- Fix login crash -> bug
(1, 3),  -- Fix login crash -> urgent
(1, 5),  -- Fix login crash -> frontend
(2, 2),  -- Dark mode -> feature
(2, 5),  -- Dark mode -> frontend
(3, 7),  -- API docs -> documentation
(4, 4),  -- Optimize queries -> backend
(4, 6),  -- Optimize queries -> database
(5, 2),  -- Password reset -> feature
(5, 4),  -- Password reset -> backend
(6, 4),  -- Unit tests -> backend
(7, 4),  -- Deploy -> backend
(8, 1),  -- Fix uploads -> bug
(8, 3),  -- Fix uploads -> urgent
(9, 2),  -- Pagination -> feature
(9, 4),  -- Pagination -> backend
(10, 7); -- README -> documentation

-- Comments
INSERT INTO comments (taskId, userId, content, createdAt, lastAlteredAt) VALUES
(1, 1, 'Reproduced on iOS 17. The crash happens right after submitting the form.', '2026-03-01 09:00:00', '2026-03-01 09:00:00'),
(1, 2, 'Looks like a null pointer in the session handler. I will take a look.', '2026-03-01 10:30:00', '2026-03-01 10:30:00'),
(1, 4, 'Fix pushed to branch fix/login-mobile. Ready for review.', '2026-03-02 14:00:00', '2026-03-02 14:00:00'),
(2, 3, 'We should follow the system preference by default and allow manual override.', '2026-03-03 11:00:00', '2026-03-03 11:00:00'),
(2, 5, 'Agreed. I can handle the CSS variables part.', '2026-03-03 11:45:00', '2026-03-03 11:45:00'),
(3, 1, 'Documentation is complete. All endpoints covered with examples.', '2026-03-05 16:00:00', '2026-03-05 16:00:00'),
(4, 4, 'Found several N+1 query issues in the reports module.', '2026-03-06 09:15:00', '2026-03-06 09:15:00'),
(4, 2, 'We should add indexes on userId and createdAt in the comments table.', '2026-03-06 10:00:00', '2026-03-06 10:00:00'),
(5, 5, 'Flow is working. Email delivery tested with Mailtrap.', '2026-03-07 13:00:00', '2026-03-07 13:00:00'),
(6, 2, 'Started writing tests for the JWT validation logic.', '2026-03-08 08:30:00', '2026-03-08 08:30:00'),
(6, 1, 'Don not forget edge cases for expired tokens.', '2026-03-08 09:00:00', '2026-03-08 09:00:00'),
(8, 3, 'Upload fails silently when file exceeds 2MB. No error shown to the user.', '2026-03-10 14:30:00', '2026-03-10 14:30:00'),
(8, 4, 'Will add proper validation and user-facing error messages.', '2026-03-10 15:00:00', '2026-03-10 15:00:00'),
(9, 5, 'Should we use cursor-based or offset pagination?', '2026-03-11 10:00:00', '2026-03-11 10:00:00'),
(9, 1, 'Cursor-based is better for large datasets. Let us go with that.', '2026-03-11 10:30:00', '2026-03-11 10:30:00');
