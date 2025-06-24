-- Insert data with stock = 999
INSERT INTO product (id, name, price, image, description, stock, created_at) VALUES
(1, 'apple', 5, 'apple.jpg', 'apple 100g', 999, '2025-06-23 14:27:36'),
(2, 'orange', 3, 'orange.jpg', 'orange 130g', 999, '2025-06-23 14:27:36'),
(3, 'mango', 4, 'mango.jpg', 'mango 150g', 999, '2025-06-23 14:27:36'),
(4, 'watermelon', 20, 'watermelon.jpg', 'watermelon 2kg', 999, '2025-06-23 14:27:36'),
(5, 'blueberry', 10, 'blueberry.jpg', 'blueberry 100g', 999, '2025-06-23 14:27:36'),
(6, 'grape', 5, 'grape.jpg', 'grape 150g', 999, '2025-06-23 14:27:36');

-- Insert sample data
INSERT INTO public.users (id, email, password_hash, name, is_admin, created_at) VALUES
(1, 'admin@example.com', 'admin123', 'Admin User', TRUE, '2025-06-23 14:29:51'),
(2, 'guest@example.com', 'guest123', 'Guest User', FALSE, '2025-06-23 14:29:52');