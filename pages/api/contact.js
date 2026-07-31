import { query } from "../../lib/db";
import { getUserFromRequest } from "../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: "Please log in to send a message." });

  const { subject, message } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: "A message is required." });
  }

  try {
    await query(
      "INSERT INTO contact_messages (user_id, subject, message) VALUES (?, ?, ?)",
      [user.id, subject || null, message]
    );
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send message." });
  }
}
