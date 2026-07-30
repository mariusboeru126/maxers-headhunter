import { query } from "../../../lib/db";
import { hashPassword, signToken, setAuthCookie } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, email, password, phone } = req.body || {};

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Full name, email, and password are required." });
  }

  try {
    const existing = await query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: "An account with that email already exists." });
    }

    const passwordHash = await hashPassword(password);
    const result = await query(
      "INSERT INTO users (full_name, email, password_hash, phone) VALUES (?, ?, ?, ?)",
      [fullName, email, passwordHash, phone || null]
    );

    const token = signToken({ id: result.insertId, email, fullName });
    setAuthCookie(res, token);

    return res.status(201).json({
      user: { id: result.insertId, fullName, email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
