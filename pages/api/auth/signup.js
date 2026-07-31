import { query } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";
import { verifyRecaptcha } from "../../../lib/recaptcha";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, email, password, phone, captchaToken } = req.body || {};

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Full name, email, and password are required." });
  }

  try {
    if (!(await verifyRecaptcha(req, captchaToken))) {
      return res.status(400).json({ error: "Please complete the reCAPTCHA challenge." });
    }

    const existing = await query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: "An account with that email already exists." });
    }

    const passwordHash = await hashPassword(password);
    await query(
      "INSERT INTO users (full_name, email, password_hash, phone) VALUES (?, ?, ?, ?)",
      [fullName, email, passwordHash, phone || null]
    );

    return res.status(201).json({ message: "Account created. You can now log in." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
