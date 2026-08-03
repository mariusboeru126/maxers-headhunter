import { query } from "../../../lib/db";
import { getUserFromRequest } from "../../../lib/auth";

export default async function handler(req, res) {
  const user = getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: "Please log in." });
  try {
    if (req.method === "GET") {
      const feedback = await query(`SELECT c.id, c.message, c.created_at, COUNT(r.id) AS reply_count,
        SUM(CASE WHEN r.id IS NOT NULL AND rr.id IS NULL THEN 1 ELSE 0 END) AS unread_count
        FROM comments c LEFT JOIN feedback_replies r ON r.source_type='comment' AND r.source_id=c.id
        LEFT JOIN feedback_reply_reads rr ON rr.reply_id=r.id AND rr.user_id=?
        WHERE c.user_id=? GROUP BY c.id ORDER BY c.created_at DESC`, [user.id, user.id]);
      const replies = await query(`SELECT r.id, r.source_id, r.message, r.created_at, u.full_name AS admin_name,
        CASE WHEN rr.id IS NULL THEN 1 ELSE 0 END AS unread
        FROM feedback_replies r JOIN comments c ON r.source_type='comment' AND r.source_id=c.id
        JOIN users u ON u.id=r.admin_id LEFT JOIN feedback_reply_reads rr ON rr.reply_id=r.id AND rr.user_id=?
        WHERE c.user_id=? ORDER BY r.created_at DESC`, [user.id, user.id]);
      return res.json({ feedback, replies, unreadCount: replies.filter((reply) => reply.unread).length });
    }
    if (req.method === "POST") {
      const replyIds = Array.isArray(req.body?.replyIds) ? req.body.replyIds.map(Number).filter(Number.isInteger) : [];
      if (!replyIds.length) return res.status(400).json({ error: "No replies selected." });
      for (const replyId of replyIds) await query(`INSERT IGNORE INTO feedback_reply_reads (reply_id, user_id)
        SELECT r.id, ? FROM feedback_replies r JOIN comments c ON r.source_type='comment' AND r.source_id=c.id
        WHERE r.id=? AND c.user_id=?`, [user.id, replyId, user.id]);
      return res.json({ ok: true });
    }
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) { console.error(error); return res.status(500).json({ error: "Could not load feedback." }); }
}
