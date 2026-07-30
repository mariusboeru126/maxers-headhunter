import { query } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rows = await query(
      "SELECT category, COUNT(*) AS count FROM jobs GROUP BY category ORDER BY count DESC"
    );
    return res.status(200).json({ categories: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load categories." });
  }
}
