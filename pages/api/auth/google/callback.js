import crypto from "crypto";
import cookie from "cookie";
import { query } from "../../../../lib/db";
import { hashPassword, signToken, AUTH_COOKIE_NAME } from "../../../../lib/auth";
import {
  STATE_COOKIE_NAME,
  NEXT_COOKIE_NAME,
  clearOAuthFlowCookies,
  getCookieValue,
  getGoogleConfig,
  safeNextPath,
} from "../../../../lib/googleOAuth";

const sessionCookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const code = typeof req.query.code === "string" ? req.query.code : "";
  const state = typeof req.query.state === "string" ? req.query.state : "";

  if (!code) {
    return res.redirect("/login?error=Google+login+was+canceled.");
  }

  try {
    const { clientId, clientSecret, redirectUri } = getGoogleConfig(req);
    const expectedState = getCookieValue(req.headers.cookie, STATE_COOKIE_NAME);
    const nextPath = getCookieValue(req.headers.cookie, NEXT_COOKIE_NAME) || "/";

    if (!expectedState || !state || expectedState !== state) {
      return res.redirect("/login?error=Invalid+Google+login+request.");
    }

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
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const profile = await userResponse.json();
    if (!userResponse.ok || !profile.email) {
      throw new Error("Could not load your Google profile.");
    }

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

    const token = signToken({ id: user.id, email: user.email, fullName: user.full_name });
    const authCookie = cookie.serialize(AUTH_COOKIE_NAME, token, {
      ...sessionCookieBase,
      maxAge: 60 * 60 * 24 * 7,
    });

    res.setHeader("Set-Cookie", [authCookie, ...clearOAuthFlowCookies()]);

    return res.redirect(safeNextPath(nextPath));
  } catch (error) {
    console.error(error);
    return res.redirect("/login?error=Google+login+failed.+Please+try+again.");
  }
}
