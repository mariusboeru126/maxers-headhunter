import { query } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rows = await query(
      `SELECT c.id, c.name, COUNT(j.id) AS count
       FROM categories c
       LEFT JOIN jobs j ON j.category_id = c.id
       GROUP BY c.id, c.name
       ORDER BY c.name`
    );
    return res.status(200).json({ categories: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load categories." });
  }
}
