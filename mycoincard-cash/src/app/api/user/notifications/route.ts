import { db } from "@/lib/db";
import { ok, requireApiUser } from "@/lib/api";

export async function GET() {
  const { error, user } = await requireApiUser();
  if (error) return error;

  const notifications = await db.notification.findMany({
    where: { userId: user.sub },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return ok(notifications);
}
