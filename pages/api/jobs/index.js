import { query } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { keyword, category, location } = req.query;

  let sql = "SELECT * FROM jobs WHERE 1=1";
  const params = [];

  if (keyword) {
    sql += " AND (title LIKE ? OR employer_name LIKE ? OR description LIKE ?)";
    const like = `%${keyword}%`;
    params.push(like, like, like);
  }

  if (category && category !== "All Categories") {
    sql += " AND category = ?";
    params.push(category);
  }

  if (location) {
    sql += " AND location LIKE ?";
    params.push(`%${location}%`);
  }

  sql += " ORDER BY posted_at DESC";

  try {
    const jobs = await query(sql, params);
    return res.status(200).json({ jobs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load jobs." });
  }
}
