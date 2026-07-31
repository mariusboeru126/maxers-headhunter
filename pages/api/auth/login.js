import { query } from "../../../lib/db";
import { verifyPassword, signToken, setAuthCookie } from "../../../lib/auth";
import { verifyRecaptcha } from "../../../lib/recaptcha";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, captchaToken } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    if (!(await verifyRecaptcha(req, captchaToken))) {
      return res.status(400).json({ error: "Please complete the reCAPTCHA challenge." });
    }

    const rows = await query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = signToken({ id: user.id, email: user.email, fullName: user.full_name });
    setAuthCookie(res, token);

    return res.status(200).json({
      user: { id: user.id, fullName: user.full_name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
