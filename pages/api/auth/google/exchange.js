import {
  buildAuthSessionCookie,
  fetchGoogleProfileFromCode,
  upsertUserFromGoogleProfile,
} from "../../../../lib/googleUser";
import { getGoogleConfig } from "../../../../lib/googleOAuth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const code = typeof req.body?.code === "string" ? req.body.code : "";
  const redirectUri =
    typeof req.body?.redirectUri === "string" && req.body.redirectUri
      ? req.body.redirectUri
      : "postmessage";

  if (!code) {
    return res.status(400).json({ error: "Missing Google authorization code." });
  }

  try {
    const { clientId, clientSecret } = getGoogleConfig(req);
    const profile = await fetchGoogleProfileFromCode({
      code,
      clientId,
      clientSecret,
      redirectUri,
    });

    const user = await upsertUserFromGoogleProfile(profile);
    res.setHeader("Set-Cookie", buildAuthSessionCookie(user));
    return res.status(200).json({
      ok: true,
      user: { id: user.id, email: user.email, fullName: user.full_name },
    });
  } catch (error) {
    console.error(error);
    if (error.code === "ACCOUNT_BLOCKED") {
      return res.status(403).json({ error: "This account has been blocked." });
    }
    return res.status(401).json({ error: "Google login failed. Please try again." });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
