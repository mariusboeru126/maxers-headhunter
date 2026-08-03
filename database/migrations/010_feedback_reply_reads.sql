CREATE TABLE IF NOT EXISTS feedback_reply_reads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reply_id INT NOT NULL,
  user_id INT NOT NULL,
  read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_feedback_reply_read (reply_id, user_id),
  FOREIGN KEY (reply_id) REFERENCES feedback_replies(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
