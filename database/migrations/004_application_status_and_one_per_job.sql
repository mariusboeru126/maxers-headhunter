SET @has_status := (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'applications' AND column_name = 'status');
SET @status_sql := IF(@has_status > 0,
  "ALTER TABLE applications MODIFY status ENUM('Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired') NOT NULL DEFAULT 'Pending'",
  "ALTER TABLE applications ADD COLUMN status ENUM('Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired') NOT NULL DEFAULT 'Pending' AFTER resume_link");
PREPARE status_statement FROM @status_sql;
EXECUTE status_statement;
DEALLOCATE PREPARE status_statement;

SET @has_submitted_at := (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'applications' AND column_name = 'submitted_at');
SET @timestamp_sql := IF(@has_submitted_at > 0,
  "ALTER TABLE applications CHANGE submitted_at created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
  "SELECT 1");
PREPARE timestamp_statement FROM @timestamp_sql;
EXECUTE timestamp_statement;
DEALLOCATE PREPARE timestamp_statement;

ALTER TABLE applications ADD UNIQUE KEY unique_application_per_user_job (user_id, job_id);
