import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { ok, fail, zodFail, requireApiAdmin } from "@/lib/api";
import { sendEmail } from "@/lib/notify";

const VALID_STATUSES = ["APPROVED", "REJECTED", "DISBURSED"] as const;
const updateSchema = z.object({
  status: z.enum(VALID_STATUSES),
  notes: z.string().max(500).optional(),
  rejectReason: z.string().max(300).optional(),
});

// PATCH /api/admin/loans/[id] — approve/reject/disburse
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, user } = await requireApiAdmin();
  if (error) return error;

  let body: z.infer<typeof updateSchema>;
  try {
    body = updateSchema.parse(await req.json());
  } catch (e) {
    return zodFail(e);
  }

  const loan = await db.loan.findUnique({ where: { id: params.id }, include: { user: true } });
  if (!loan) return fail("Loan not found", 404);

  const updated = await db.loan.update({
    where: { id: params.id },
    data: {
      status: body.status,
      notes: body.notes,
      rejectReason: body.status === "REJECTED" ? body.rejectReason : undefined,
      reviewerId: user.sub,
      approvedAt: body.status === "APPROVED" ? new Date() : undefined,
      rejectedAt: body.status === "REJECTED" ? new Date() : undefined,
      disbursedAt: body.status === "DISBURSED" ? new Date() : undefined,
    },
  });

  await db.loanEvent.create({
    data: { loanId: loan.id, status: body.status, message: body.notes || `Status changed to ${body.status}` },
  });

  // Notify user
  const title = body.status === "APPROVED" ? "Loan Approved!" : body.status === "REJECTED" ? "Loan Not Approved" : "Funds Disbursed";
  await db.notification.create({
    data: {
      userId: loan.userId,
      type: body.status === "REJECTED" ? "DANGER" : "SUCCESS",
      title,
      body: `Your loan ${loan.reference} has been ${body.status.toLowerCase()}.`,
      link: `/dashboard/loans`,
    },
  });

  sendEmail(loan.user.email, title, `Your loan ${loan.reference} has been ${body.status.toLowerCase()}.`).catch(() => {});

  return ok(updated);
}
