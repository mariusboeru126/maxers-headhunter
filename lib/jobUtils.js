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
