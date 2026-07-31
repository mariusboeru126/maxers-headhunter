function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "";
}

export async function verifyHCaptcha(req, token) {
  const secret = process.env.HCAPTCHA_SECRET;
  const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

  if (!secret || !sitekey) {
    throw new Error("hCaptcha is not configured.");
  }

  if (!token) return false;

  const response = await fetch("https://api.hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: getClientIp(req),
      sitekey,
    }),
  });

  if (!response.ok) return false;
  const result = await response.json();
  return result.success === true;
}
