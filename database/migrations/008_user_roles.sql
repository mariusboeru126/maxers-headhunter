-- Safe to run on databases created before email verification was introduced.
SET @has_verified_at := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'email_verified_at'
);
SET @add_verified_at := IF(
  @has_verified_at = 0,
  'ALTER TABLE users ADD COLUMN email_verified_at TIMESTAMP NULL AFTER phone',
  'SELECT 1'
);
PREPARE add_verified_at_statement FROM @add_verified_at;
EXECUTE add_verified_at_statement;
DEALLOCATE PREPARE add_verified_at_statement;

SET @has_role := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'
);
SET @add_role := IF(
  @has_role = 0,
  "ALTER TABLE users ADD COLUMN role ENUM('user', 'admin') NOT NULL DEFAULT 'user' AFTER email_verified_at",
  'SELECT 1'
);
PREPARE add_role_statement FROM @add_role;
EXECUTE add_role_statement;
DEALLOCATE PREPARE add_role_statement;
