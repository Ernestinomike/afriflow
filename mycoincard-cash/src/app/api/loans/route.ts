import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { ok, fail, zodFail, requireApiUser, withRateLimit } from "@/lib/api";
import { loanReference } from "@/lib/utils";
import { sendEmail } from "@/lib/notify";

const createSchema = z.object({
  amount: z.number().min(1000).max(100000),
  termMonths: z.number().min(3).max(60),
  purpose: z.string().min(3).max(200),
  currency: z.string().max(3).default("USD"),
});

// GET /api/loans — list user's loans
export async function GET() {
  const { error, user } = await requireApiUser();
  if (error) return error;

  const loans = await db.loan.findMany({
    where: { userId: user.sub },
    orderBy: { createdAt: "desc" },
    include: { events: { orderBy: { createdAt: "asc" } } },
  });

  return ok(loans);
}

// POST /api/loans — create loan application
export async function POST(req: NextRequest) {
  const rl = withRateLimit(req, "loan-create", 5);
  if (rl) return rl;

  const { error, user } = await requireApiUser();
  if (error) return error;

  let body: z.infer<typeof createSchema>;
  try {
    body = createSchema.parse(await req.json());
  } catch (e) {
    return zodFail(e);
  }

  const loan = await db.loan.create({
    data: {
      reference: loanReference(),
      userId: user.sub,
      amount: body.amount,
      termMonths: body.termMonths,
      interestRate: 8.5,
      purpose: body.purpose,
      currency: body.currency,
      status: "SUBMITTED",
    },
  });

  await db.loanEvent.create({
    data: { loanId: loan.id, status: "SUBMITTED", message: "Application submitted" },
  });

  // Create notification
  await db.notification.create({
    data: {
      userId: user.sub,
      type: "INFO",
      title: "Application received",
      body: `Your loan application for $${loan.amount.toLocaleString()} has been submitted.`,
      link: `/dashboard/loans`,
    },
  });

  // Notify admin
  sendEmail("admin@mycoincard.cash", "New Loan Application", `${user.email} applied for $${loan.amount}`).catch(() => {});

  return ok(loan, { status: 201 });
}
