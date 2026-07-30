-- Run on existing databases:
-- mysql -u root -p maxers_headhunter < database/migrations/001_job_slug_work_type_salary.sql

ALTER TABLE jobs ADD COLUMN slug VARCHAR(255) NULL AFTER id;
ALTER TABLE jobs ADD COLUMN work_type ENUM('Onsite', 'Hybrid', 'Remote') NOT NULL DEFAULT 'Onsite' AFTER job_type;
ALTER TABLE jobs ADD COLUMN salary_min INT NULL AFTER salary_range;
ALTER TABLE jobs ADD COLUMN salary_max INT NULL AFTER salary_min;

UPDATE jobs SET slug = CONCAT(
  TRIM(BOTH '-' FROM LOWER(REGEXP_REPLACE(CONCAT(title, '-', employer_name), '[^a-zA-Z0-9]+', '-'))),
  '-',
  id
) WHERE slug IS NULL OR slug = '';

ALTER TABLE jobs MODIFY slug VARCHAR(255) NOT NULL;
ALTER TABLE jobs ADD UNIQUE INDEX idx_jobs_slug (slug);
