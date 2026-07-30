-- Run on existing databases: mysql -u root -p maxers_headhunter < database/migrations/001_job_slug_work_type_salary.sql

ALTER TABLE jobs
  ADD COLUMN IF NOT EXISTS slug VARCHAR(255) NULL AFTER id,
  ADD COLUMN IF NOT EXISTS work_type ENUM('Onsite', 'Hybrid', 'Remote') NOT NULL DEFAULT 'Onsite' AFTER job_type,
  ADD COLUMN IF NOT EXISTS salary_min INT NULL AFTER salary_range,
  ADD COLUMN IF NOT EXISTS salary_max INT NULL AFTER salary_min;

-- MySQL 8.0.12+ may not support IF NOT EXISTS on ADD COLUMN; ignore errors if columns exist.

UPDATE jobs SET slug = CONCAT(
  TRIM(BOTH '-' FROM REGEXP_REPLACE(LOWER(CONCAT(title, '-', employer_name)), '[^a-z0-9]+', '-')),
  '-',
  id
) WHERE slug IS NULL OR slug = '';

ALTER TABLE jobs MODIFY slug VARCHAR(255) NOT NULL;
CREATE UNIQUE INDEX idx_jobs_slug ON jobs (slug);
