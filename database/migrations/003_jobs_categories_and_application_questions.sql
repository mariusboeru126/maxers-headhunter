CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO categories (name) VALUES
  ('IT & Software'), ('Accounting & Finance'), ('Human Resources'),
  ('Marketing & Sales'), ('Design & Creative'), ('Administration');

INSERT INTO categories (name)
SELECT DISTINCT category FROM jobs WHERE category IS NOT NULL
ON DUPLICATE KEY UPDATE name = VALUES(name);

ALTER TABLE jobs ADD COLUMN category_id INT NULL AFTER location;
UPDATE jobs j JOIN categories c ON c.name = j.category SET j.category_id = c.id;
ALTER TABLE jobs MODIFY category_id INT NOT NULL;
ALTER TABLE jobs ADD CONSTRAINT fk_jobs_category FOREIGN KEY (category_id) REFERENCES categories(id);
ALTER TABLE jobs DROP COLUMN category, DROP COLUMN slug, DROP COLUMN responsibilities, DROP COLUMN requirements, DROP COLUMN salary_range;

CREATE TABLE application_form_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT NOT NULL,
  question VARCHAR(500) NOT NULL,
  input_type ENUM('input', 'textarea', 'multi-select', 'single-select') NOT NULL DEFAULT 'input',
  select_items TEXT NULL,
  is_required BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

CREATE TABLE application_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_id INT NOT NULL,
  question_id INT NOT NULL,
  answer TEXT NULL,
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES application_form_questions(id) ON DELETE CASCADE
);
