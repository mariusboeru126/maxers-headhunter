import { query } from "../../../lib/db";
import { decryptJobLink } from "../../../lib/jobLink";

export default async function handler(req, res) {
  const { slug } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const jobId = decryptJobLink(slug);
    if (!jobId) return res.status(404).json({ error: "Job not found." });
    const rows = await query(
      "SELECT j.*, c.name AS category_name FROM jobs j JOIN categories c ON c.id = j.category_id WHERE j.id = ?",
      [jobId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Job not found." });
    }
    return res.status(200).json({ job: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load job." });
  }
}
