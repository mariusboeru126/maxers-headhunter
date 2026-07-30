export function slugifyJob(title, employerName, existingSlugs = new Set()) {
  const parts = [title, employerName]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let slug = parts || "job";
  let suffix = 2;
  while (existingSlugs.has(slug)) {
    slug = `${parts}-${suffix}`;
    suffix += 1;
  }
  existingSlugs.add(slug);
  return slug;
}

export const JOB_CATEGORIES = [
  "IT & Software",
  "Accounting & Finance",
  "Human Resources",
  "Marketing & Sales",
  "Design & Creative",
  "Administration",
];

export function categoryAccent(category) {
  const map = {
    "IT & Software": { bg: "bg-blue-600", icon: "code" },
    "Accounting & Finance": { bg: "bg-emerald-600", icon: "finance" },
    "Human Resources": { bg: "bg-green-600", icon: "people" },
    "Marketing & Sales": { bg: "bg-violet-600", icon: "chart" },
    "Design & Creative": { bg: "bg-orange-500", icon: "design" },
    Administration: { bg: "bg-slate-600", icon: "admin" },
  };
  return map[category] || { bg: "bg-brand", icon: "briefcase" };
}
