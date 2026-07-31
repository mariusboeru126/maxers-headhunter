import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const COOKIE_NAME = "maxers_session";

export async function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function signEmailVerificationToken(payload) {
  return jwt.sign({ ...payload, purpose: "email-verification" }, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyEmailVerificationToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload.purpose === "email-verification" ? payload : null;
  } catch (err) {
    return null;
  }
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

// Attach an httpOnly session cookie to an API response
export function setAuthCookie(res, token) {
  const cookieString = `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }; Max-Age=${60 * 60 * 24 * 7}`;
  res.setHeader("Set-Cookie", cookieString);
}

export function clearAuthCookie(res) {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

// Read + verify the session cookie from an incoming API request
export function getUserFromRequest(req) {
  const cookieHeader = req.headers.cookie || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => {
      const [name, ...rest] = c.split("=");
      return [name, rest.join("=")];
    })
  );
  const token = cookies[COOKIE_NAME];
  if (!token) return null;
  return verifyToken(token);
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;
