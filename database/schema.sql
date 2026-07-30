CREATE DATABASE IF NOT EXISTS maxers_headhunter;
USE maxers_headhunter;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  employer_name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  job_type VARCHAR(50) NOT NULL DEFAULT 'Full-time',
  work_type ENUM('Onsite', 'Hybrid', 'Remote') NOT NULL DEFAULT 'Onsite',
  salary_range VARCHAR(100) NULL,
  salary_min INT NULL,
  salary_max INT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT NULL,
  requirements TEXT NULL,
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jobs (
  slug, title, employer_name, location, category, job_type, work_type,
  salary_range, salary_min, salary_max, description, responsibilities, requirements, posted_at
) VALUES
(
  'software-engineer-technova-solutions',
  'Software Engineer',
  'TechNova Solutions',
  'Remote',
  'IT & Software',
  'Full-time',
  'Remote',
  '$90,000 - $120,000',
  90000,
  120000,
  'Build scalable web applications for enterprise clients.',
  'Design and implement APIs\nCollaborate with product teams\nWrite automated tests',
  '3+ years experience\nNode.js or Python\nSQL databases',
  DATE_SUB(NOW(), INTERVAL 2 DAY)
),
(
  'hr-specialist-global-hr-partners',
  'HR Specialist',
  'Global HR Partners',
  'New York, USA',
  'Human Resources',
  'Full-time',
  'Hybrid',
  '$55,000 - $70,000',
  55000,
  70000,
  'Support recruitment and employee lifecycle programs.',
  'Screen candidates\nCoordinate interviews\nMaintain HR records',
  'HR experience\nStrong communication\nOrganizational skills',
  DATE_SUB(NOW(), INTERVAL 5 DAY)
),
(
  'data-analyst-insight-analytics',
  'Data Analyst',
  'Insight Analytics',
  'Chicago, USA',
  'IT & Software',
  'Full-time',
  'Onsite',
  '$65,000 - $85,000',
  65000,
  85000,
  'Turn business data into actionable insights.',
  'Build dashboards\nAnalyze trends\nPresent findings to stakeholders',
  'SQL and Excel\nTableau or Power BI\nStatistics fundamentals',
  DATE_SUB(NOW(), INTERVAL 8 DAY)
);
