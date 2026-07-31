SET @has_verified_at := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'email_verified_at'
);
SET @remove_verified_at := IF(
  @has_verified_at = 1,
  'ALTER TABLE users DROP COLUMN email_verified_at',
  'SELECT 1'
);
PREPARE remove_verified_at_statement FROM @remove_verified_at;
EXECUTE remove_verified_at_statement;
DEALLOCATE PREPARE remove_verified_at_statement;
