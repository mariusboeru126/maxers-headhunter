import crypto from "crypto";

const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7;

function key() {
  return crypto.createHash("sha256").update(process.env.JOB_LINK_SECRET || process.env.JWT_SECRET || "dev_job_link_secret").digest();
}

export function encryptJobLink(jobId) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(), iv);
  const plaintext = JSON.stringify({ id: Number(jobId), issuedAt: Date.now() });
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ciphertext]).toString("base64url");
}

export function decryptJobLink(token) {
  try {
    const data = Buffer.from(token, "base64url");
    const iv = data.subarray(0, 12);
    const tag = data.subarray(12, 28);
    const ciphertext = data.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", key(), iv);
    decipher.setAuthTag(tag);
    const payload = JSON.parse(Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8"));
    if (!Number.isInteger(payload.id) || !payload.issuedAt || Date.now() - payload.issuedAt > MAX_AGE_MS) return null;
    return payload.id;
  } catch {
    return null;
  }
}
