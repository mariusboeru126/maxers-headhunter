import { query } from "../../../lib/db";

export default async function handler(req, res) {
  const { slug } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rows = await query("SELECT * FROM jobs WHERE slug = ?", [slug]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Job not found." });
    }
    return res.status(200).json({ job: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load job." });
  }
}
