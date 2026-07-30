import crypto from "crypto";
import cookie from "cookie";
import { query } from "./db";
import { hashPassword, signToken, AUTH_COOKIE_NAME } from "./auth";

const sessionCookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export async function upsertUserFromGoogleProfile(profile) {
  const rows = await query("SELECT id, full_name, email FROM users WHERE email = ?", [profile.email]);
  let user = rows[0];

  if (!user) {
    const randomPassword = crypto.randomBytes(24).toString("hex");
    const passwordHash = await hashPassword(randomPassword);
    const fullName = profile.name || profile.given_name || profile.email.split("@")[0];
    const result = await query(
      "INSERT INTO users (full_name, email, password_hash, phone) VALUES (?, ?, ?, ?)",
      [fullName, profile.email, passwordHash, null]
    );
    user = { id: result.insertId, full_name: fullName, email: profile.email };
  }

  return user;
}

export function buildAuthSessionCookie(user) {
  const token = signToken({ id: user.id, email: user.email, fullName: user.full_name });
  return cookie.serialize(AUTH_COOKIE_NAME, token, {
    ...sessionCookieBase,
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function fetchGoogleProfileFromCode({ code, clientId, clientSecret, redirectUri }) {
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok || tokenData.error) {
    throw new Error(tokenData.error_description || tokenData.error || "Failed to exchange Google code.");
  }

  const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  const profile = await userResponse.json();
  if (!userResponse.ok || !profile.email) {
    throw new Error("Could not load your Google profile.");
  }

  return profile;
}
