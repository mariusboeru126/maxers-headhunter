import { query } from "../../../lib/db";
import { hashPassword, signEmailVerificationToken } from "../../../lib/auth";
import { verifyHCaptcha } from "../../../lib/hcaptcha";
import { sendVerificationEmail } from "../../../lib/email";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, email, password, phone, captchaToken } = req.body || {};

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Full name, email, and password are required." });
  }

  try {
    if (!(await verifyHCaptcha(req, captchaToken))) {
      return res.status(400).json({ error: "Please complete the hCaptcha challenge." });
    }

    const existing = await query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: "An account with that email already exists." });
    }

    const passwordHash = await hashPassword(password);
    const result = await query(
      "INSERT INTO users (full_name, email, password_hash, phone) VALUES (?, ?, ?, ?)",
      [fullName, email, passwordHash, phone || null]
    );

    const verificationToken = signEmailVerificationToken({ id: result.insertId, email });
    const appUrl = process.env.APP_URL || `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}`;
    const verificationUrl = `${appUrl}/api/auth/verify-email?token=${encodeURIComponent(verificationToken)}`;
    await sendVerificationEmail({ email, fullName, verificationUrl });

    return res.status(201).json({
      message: "Account created. Check your email to verify your account before logging in.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
