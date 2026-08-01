import crypto from "crypto";
import {
  clearOAuthFlowCookies,
  getCookieValue,
  getGoogleConfig,
  safeNextPath,
  STATE_COOKIE_NAME,
  NEXT_COOKIE_NAME,
  buildGoogleAuthUrl,
} from "../../../../lib/googleOAuth";
import {
  buildAuthSessionCookie,
  fetchGoogleProfileFromCode,
  upsertUserFromGoogleProfile,
} from "../../../../lib/googleUser";

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

    const profile = await fetchGoogleProfileFromCode({
      code,
      clientId,
      clientSecret,
      redirectUri,
    });

    const user = await upsertUserFromGoogleProfile(profile);
    res.setHeader("Set-Cookie", [buildAuthSessionCookie(user), ...clearOAuthFlowCookies()]);

    return res.redirect(safeNextPath(nextPath));
  } catch (error) {
    console.error(error);
    if (error.code === "ACCOUNT_BLOCKED") {
      return res.redirect("/login?error=This+account+has+been+blocked.");
    }
    return res.redirect("/login?error=Google+login+failed.+Please+try+again.");
  }
}
