import cookie from "cookie";

export const STATE_COOKIE_NAME = "maxers_google_oauth_state";
export const NEXT_COOKIE_NAME = "maxers_google_oauth_next";

const cookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export function getRedirectUri(req) {
  if (process.env.GOOGLE_REDIRECT_URI) {
    return process.env.GOOGLE_REDIRECT_URI;
  }

  const host = req.headers.host || "localhost:3000";
  const proto = (req.headers["x-forwarded-proto"] || "http").toString().split(",")[0];
  return `${proto}://${host}/api/auth/google/callback`;
}

export function getGoogleConfig(req) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = getRedirectUri(req);

  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth is not configured.");
  }

  return { clientId, clientSecret, redirectUri };
}

export function getCookieValue(cookieHeader, name) {
  const parsed = cookie.parse(cookieHeader || "");
  return parsed[name] || "";
}

export function safeNextPath(nextPath) {
  return nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";
}

export function oauthFlowCookies(state, nextPath) {
  const maxAge = 60 * 10;
  return [
    cookie.serialize(STATE_COOKIE_NAME, state, { ...cookieBase, maxAge }),
    cookie.serialize(NEXT_COOKIE_NAME, nextPath, { ...cookieBase, maxAge }),
  ];
}

export function clearOAuthFlowCookies() {
  return [
    cookie.serialize(STATE_COOKIE_NAME, "", { ...cookieBase, maxAge: 0 }),
    cookie.serialize(NEXT_COOKIE_NAME, "", { ...cookieBase, maxAge: 0 }),
  ];
}

export function buildGoogleAuthUrl({ clientId, redirectUri, state }) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
    state,
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
