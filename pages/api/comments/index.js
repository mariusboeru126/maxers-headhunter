import { query } from "../../../lib/db";
import { getUserFromRequest } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const user = getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: "Please log in to send a comment." });
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (message.length < 50) return res.status(400).json({ error: "A comment must be at least 50 characters." });
  try {
    await query("INSERT INTO comments (user_id, message) VALUES (?, ?)", [user.id, message]);
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send comment." });
  }
}
