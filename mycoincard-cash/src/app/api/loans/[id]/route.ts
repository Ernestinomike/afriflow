import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, fail, requireApiUser } from "@/lib/api";

// GET /api/loans/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, user } = await requireApiUser();
  if (error) return error;

  const loan = await db.loan.findUnique({
    where: { id: params.id },
    include: { events: { orderBy: { createdAt: "asc" } }, documents: true },
  });

  if (!loan) return fail("Loan not found", 404);
  if (loan.userId !== user.sub && user.role !== "ADMIN") return fail("Forbidden", 403);

  return ok(loan);
}
