ALTER TABLE contact_messages ADD COLUMN user_id INT NOT NULL AFTER id;
ALTER TABLE contact_messages CHANGE submitted_at created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE contact_messages DROP COLUMN name, DROP COLUMN email;
ALTER TABLE contact_messages ADD CONSTRAINT fk_contact_messages_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
