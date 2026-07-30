export const STATE_COOKIE_NAME = "maxers_google_oauth_state";
export const NEXT_COOKIE_NAME = "maxers_google_oauth_next";

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
  const cookies = Object.fromEntries(
    (cookieHeader || "").split("; ").map((c) => {
      const [n, ...rest] = c.split("=");
      return [n, rest.join("=")];
    })
  );
  return cookies[name] || "";
}

export function safeNextPath(nextPath) {
  return nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";
}

export function oauthFlowCookies(state, nextPath) {
  const maxAge = 60 * 10;
  const secureSuffix = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return [
    `${STATE_COOKIE_NAME}=${state}; Path=/; HttpOnly; SameSite=Lax${secureSuffix}; Max-Age=${maxAge}`,
    `${NEXT_COOKIE_NAME}=${nextPath}; Path=/; HttpOnly; SameSite=Lax${secureSuffix}; Max-Age=${maxAge}`,
  ];
}

export function clearOAuthFlowCookies() {
  const maxAge = 0;
  const secureSuffix = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return [
    `${STATE_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax${secureSuffix}; Max-Age=${maxAge}`,
    `${NEXT_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax${secureSuffix}; Max-Age=${maxAge}`,
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
