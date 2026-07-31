CREATE DATABASE IF NOT EXISTS maxers_headhunter;
USE maxers_headhunter;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NULL,
  email_verified_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  employer_name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  job_type VARCHAR(50) NOT NULL DEFAULT 'Full-time',
  work_type ENUM('Onsite', 'Hybrid', 'Remote') NOT NULL DEFAULT 'Onsite',
  salary_min INT NULL,
  salary_max INT NULL,
  description TEXT NOT NULL,
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT NOT NULL,
  user_id INT NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NULL,
  cover_letter TEXT NULL,
  resume_link VARCHAR(500) NULL,
  resume_file VARCHAR(500) NULL,
  status ENUM('Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired') NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_application_per_user_job (user_id, job_id)
);

CREATE TABLE IF NOT EXISTS application_form_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT NOT NULL,
  question VARCHAR(500) NOT NULL,
  input_type ENUM('input', 'textarea', 'multi-select', 'single-select') NOT NULL DEFAULT 'input',
  select_items TEXT NULL,
  is_required BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS application_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_id INT NOT NULL,
  question_id INT NOT NULL,
  answer TEXT NULL,
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES application_form_questions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  subject VARCHAR(255) NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO categories (name) VALUES
('IT & Software'), ('Human Resources')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO jobs (
  title, employer_name, location, category_id, job_type, work_type,
  salary_min, salary_max, description, posted_at
) VALUES
(
  'Software Engineer',
  'TechNova Solutions',
  'Remote',
  (SELECT id FROM categories WHERE name = 'IT & Software'),
  'Full-time',
  'Remote',
  90000,
  120000,
  '<p>Build scalable web applications for enterprise clients.</p>',
  DATE_SUB(NOW(), INTERVAL 2 DAY)
),
(
  'HR Specialist',
  'Global HR Partners',
  'New York, USA',
  (SELECT id FROM categories WHERE name = 'Human Resources'),
  'Full-time',
  'Hybrid',
  55000,
  70000,
  '<p>Support recruitment and employee lifecycle programs.</p>',
  DATE_SUB(NOW(), INTERVAL 5 DAY)
),
(
  'Data Analyst',
  'Insight Analytics',
  'Chicago, USA',
  (SELECT id FROM categories WHERE name = 'IT & Software'),
  'Full-time',
  'Onsite',
  65000,
  85000,
  '<p>Turn business data into actionable insights.</p>',
  DATE_SUB(NOW(), INTERVAL 8 DAY)
);
