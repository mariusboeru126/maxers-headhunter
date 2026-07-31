import { query } from "../../../lib/db";
import { encryptJobLink } from "../../../lib/jobLink";

function buildJobsQuery(queryParams, { countOnly = false } = {}) {
  const {
    keyword,
    categoryId,
    location,
    jobType,
    workType,
    salaryMin,
    salaryMax,
    postedWithin,
  } = queryParams;

  let sql = countOnly
    ? "SELECT COUNT(*) AS total FROM jobs j WHERE 1=1"
    : "SELECT j.*, c.name AS category_name FROM jobs j JOIN categories c ON c.id = j.category_id WHERE 1=1";
  const params = [];

  if (keyword) {
    sql += " AND (j.title LIKE ? OR j.employer_name LIKE ? OR j.description LIKE ?)";
    const like = `%${keyword}%`;
    params.push(like, like, like);
  }

  if (categoryId && Number.isInteger(Number(categoryId))) {
    sql += " AND j.category_id = ?";
    params.push(Number(categoryId));
  }

  if (location) {
    sql += " AND j.location LIKE ?";
    params.push(`%${location}%`);
  }

  if (jobType && jobType !== "All Types") {
    sql += " AND j.job_type = ?";
    params.push(jobType);
  }

  if (workType && workType !== "All Work Types") {
    sql += " AND j.work_type = ?";
    params.push(workType);
  }

  const minSal = salaryMin ? parseInt(salaryMin, 10) : null;
  const maxSal = salaryMax ? parseInt(salaryMax, 10) : null;
  if (minSal && !Number.isNaN(minSal)) {
    sql += " AND (j.salary_max IS NULL OR j.salary_max >= ?)";
    params.push(minSal);
  }
  if (maxSal && !Number.isNaN(maxSal)) {
    sql += " AND (j.salary_min IS NULL OR j.salary_min <= ?)";
    params.push(maxSal);
  }

  const days = postedWithin ? parseInt(postedWithin, 10) : null;
  if (days && !Number.isNaN(days) && days > 0) {
    sql += " AND j.posted_at >= DATE_SUB(NOW(), INTERVAL ? DAY)";
    params.push(days);
  }

  if (!countOnly) {
    sql += " ORDER BY j.posted_at DESC";
  }

  return { sql, params };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit, 10) || 10));
    const { sql, params } = buildJobsQuery(req.query);
    const jobsSql = `${sql} LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
    const jobs = await query(jobsSql, params);

    const { sql: countSql, params: countParams } = buildJobsQuery(req.query, { countOnly: true });
    const countRows = await query(countSql, countParams);
    const total = countRows[0]?.total ?? jobs.length;

    return res.status(200).json({ jobs: jobs.map((job) => ({ ...job, detail_token: encryptJobLink(job.id) })), total, page, limit });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load jobs." });
  }
}
