import crypto from "crypto";
import {
  buildGoogleAuthUrl,
  getGoogleConfig,
  oauthFlowCookies,
  safeNextPath,
} from "../../../../lib/googleOAuth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const nextRaw = typeof req.query.next === "string" ? req.query.next : "/";
    const safeNext = safeNextPath(nextRaw);
    const state = crypto.randomBytes(16).toString("hex");
    const { clientId, redirectUri } = getGoogleConfig(req);

    res.setHeader("Set-Cookie", oauthFlowCookies(state, safeNext));

    res.writeHead(302, {
      Location: buildGoogleAuthUrl({ clientId, redirectUri, state }),
    });
    return res.end();
  } catch (error) {
    console.error(error);
    return res.redirect("/login?error=Google+login+is+not+configured+yet.");
  }
}
