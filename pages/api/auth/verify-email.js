import { query } from "../../../lib/db";
import { verifyEmailVerificationToken } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const token = typeof req.query.token === "string" ? req.query.token : "";
  const payload = verifyEmailVerificationToken(token);
  if (!payload) return res.redirect("/login?error=This+verification+link+is+invalid+or+expired.");

  try {
    await query(
      "UPDATE users SET email_verified_at = COALESCE(email_verified_at, NOW()) WHERE id = ? AND email = ?",
      [payload.id, payload.email]
    );
    return res.redirect("/login?verified=1");
  } catch (error) {
    console.error(error);
    return res.redirect("/login?error=We+could+not+verify+your+email.+Please+try+again.");
  }
}
