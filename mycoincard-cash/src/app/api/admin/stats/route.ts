import { db } from "@/lib/db";
import { ok, requireApiAdmin } from "@/lib/api";

// GET /api/admin/stats — dashboard stats
export async function GET() {
  const { error } = await requireApiAdmin();
  if (error) return error;

  const [totalUsers, totalLoans, pendingKyc, openTickets] = await Promise.all([
    db.user.count(),
    db.loan.count(),
    db.kycRecord.count({ where: { status: "PENDING" } }),
    db.ticket.count({ where: { status: "OPEN" } }),
  ]);

  const approvedLoans = await db.loan.findMany({
    where: { status: { in: ["APPROVED", "DISBURSED", "REPAID"] } },
    select: { amount: true },
  });
  const totalFunded = approvedLoans.reduce((s, l) => s + l.amount, 0);

  return ok({ totalUsers, totalLoans, pendingKyc, openTickets, totalFunded });
}
