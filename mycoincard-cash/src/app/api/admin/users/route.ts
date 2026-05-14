import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, requireApiAdmin } from "@/lib/api";

// GET /api/admin/users
export async function GET(req: NextRequest) {
  const { error } = await requireApiAdmin();
  if (error) return error;

  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") || "1");
  const limit = Math.min(Number(url.searchParams.get("limit") || "20"), 100);
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    db.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        role: true, emailVerified: true, country: true, createdAt: true,
        kyc: { select: { status: true } },
        _count: { select: { loans: true } },
      },
    }),
    db.user.count(),
  ]);

  return ok({ users, total, page, limit });
}
