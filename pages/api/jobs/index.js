import { query } from "../../../lib/db";

function buildJobsQuery(queryParams, { countOnly = false } = {}) {
  const {
    keyword,
    category,
    location,
    jobType,
    workType,
    salaryMin,
    salaryMax,
    postedWithin,
  } = queryParams;

  let sql = countOnly ? "SELECT COUNT(*) AS total FROM jobs WHERE 1=1" : "SELECT * FROM jobs WHERE 1=1";
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

  if (jobType && jobType !== "All Types") {
    sql += " AND job_type = ?";
    params.push(jobType);
  }

  if (workType && workType !== "All Work Types") {
    sql += " AND work_type = ?";
    params.push(workType);
  }

  const minSal = salaryMin ? parseInt(salaryMin, 10) : null;
  const maxSal = salaryMax ? parseInt(salaryMax, 10) : null;
  if (minSal && !Number.isNaN(minSal)) {
    sql += " AND (salary_max IS NULL OR salary_max >= ?)";
    params.push(minSal);
  }
  if (maxSal && !Number.isNaN(maxSal)) {
    sql += " AND (salary_min IS NULL OR salary_min <= ?)";
    params.push(maxSal);
  }

  const days = postedWithin ? parseInt(postedWithin, 10) : null;
  if (days && !Number.isNaN(days) && days > 0) {
    sql += " AND posted_at >= DATE_SUB(NOW(), INTERVAL ? DAY)";
    params.push(days);
  }

  if (!countOnly) {
    sql += " ORDER BY posted_at DESC";
  }

  return { sql, params };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { sql, params } = buildJobsQuery(req.query);
    const jobs = await query(sql, params);

    const { sql: countSql, params: countParams } = buildJobsQuery(req.query, { countOnly: true });
    const countRows = await query(countSql, countParams);
    const total = countRows[0]?.total ?? jobs.length;

    return res.status(200).json({ jobs, total });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load jobs." });
  }
}
