import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

function ref(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

async function main() {
  console.log("Seeding MyCoinCard Cash database...");

  // Wipe in dependency order (idempotent dev seed)
  await db.message.deleteMany();
  await db.ticket.deleteMany();
  await db.notification.deleteMany();
  await db.loanEvent.deleteMany();
  await db.document.deleteMany();
  await db.loan.deleteMany();
  await db.kycRecord.deleteMany();
  await db.subscription.deleteMany();
  await db.auditLog.deleteMany();
  await db.passwordReset.deleteMany();
  await db.emailVerification.deleteMany();
  await db.broadcast.deleteMany();
  await db.user.deleteMany();

  const adminPwd = await bcrypt.hash("Admin@12345", 10);
  const userPwd = await bcrypt.hash("Demo@12345", 10);

  const admin = await db.user.create({
    data: {
      email: "admin@mycoincard.cash",
      firstName: "Ada",
      lastName: "Admin",
      passwordHash: adminPwd,
      role: "ADMIN",
      emailVerified: true,
      referralCode: "MCC-ADMIN",
      country: "United States",
      city: "New York"
    }
  });

  const demo = await db.user.create({
    data: {
      email: "demo@mycoincard.cash",
      firstName: "Demo",
      lastName: "User",
      passwordHash: userPwd,
      role: "USER",
      emailVerified: true,
      referralCode: "MCC-DEMO01",
      country: "United Kingdom",
      city: "London",
      occupation: "Software Engineer",
      monthlyIncome: 7500,
      avatarUrl: "https://i.pravatar.cc/150?u=demo"
    }
  });

  const otherUsers = await Promise.all(
    Array.from({ length: 8 }).map(async (_, i) => {
      return db.user.create({
        data: {
          email: `user${i + 1}@example.com`,
          firstName: ["Jordan", "Sam", "Riley", "Taylor", "Morgan", "Casey", "Avery", "Quinn"][i],
          lastName: ["Lee", "Kim", "Patel", "Garcia", "Smith", "Doe", "Khan", "Brown"][i],
          passwordHash: userPwd,
          referralCode: `MCC-${(i + 100).toString(36).toUpperCase()}`,
          emailVerified: i % 2 === 0,
          country: ["Nigeria", "Kenya", "Ghana", "USA", "UK", "Germany", "France", "Brazil"][i],
          monthlyIncome: 2000 + i * 850,
          avatarUrl: `https://i.pravatar.cc/150?u=user${i + 1}`
        }
      });
    })
  );

  // KYC for demo user
  await db.kycRecord.create({
    data: { userId: demo.id, status: "VERIFIED", idType: "Passport", idNumber: "P***45698" }
  });

  // Loans for demo
  const loanData = [
    { amount: 5000, term: 12, status: "APPROVED", purpose: "Business expansion" },
    { amount: 1500, term: 6, status: "DISBURSED", purpose: "Emergency repair" },
    { amount: 12000, term: 24, status: "UNDER_REVIEW", purpose: "Education" }
  ];
  for (const l of loanData) {
    const loan = await db.loan.create({
      data: {
        reference: ref("LN"),
        userId: demo.id,
        amount: l.amount,
        termMonths: l.term,
        interestRate: 8.5,
        purpose: l.purpose,
        status: l.status,
        approvedAt: l.status === "APPROVED" || l.status === "DISBURSED" ? new Date() : null,
        disbursedAt: l.status === "DISBURSED" ? new Date() : null
      }
    });
    await db.loanEvent.createMany({
      data: [
        { loanId: loan.id, status: "SUBMITTED", message: "Application submitted" },
        { loanId: loan.id, status: "UNDER_REVIEW", message: "Underwriting started" },
        ...(l.status === "APPROVED" || l.status === "DISBURSED"
          ? [{ loanId: loan.id, status: "APPROVED", message: "Approved" }]
          : []),
        ...(l.status === "DISBURSED" ? [{ loanId: loan.id, status: "DISBURSED", message: "Funds disbursed" }] : [])
      ]
    });
  }

  // Loans for others
  for (const u of otherUsers) {
    const statuses = ["SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED"];
    const s = statuses[Math.floor(Math.random() * statuses.length)];
    await db.loan.create({
      data: {
        reference: ref("LN"),
        userId: u.id,
        amount: 1000 + Math.floor(Math.random() * 20000),
        termMonths: [6, 12, 18, 24][Math.floor(Math.random() * 4)],
        interestRate: 7 + Math.random() * 6,
        purpose: ["Home renovation", "Medical bill", "Business", "Travel", "Education"][Math.floor(Math.random() * 5)],
        status: s,
        approvedAt: s === "APPROVED" ? new Date() : null
      }
    });
  }

  // Notifications
  await db.notification.createMany({
    data: [
      { userId: demo.id, type: "SUCCESS", title: "Loan approved", body: "Your $5,000 loan has been approved." },
      { userId: demo.id, type: "INFO", title: "Welcome to MyCoinCard Cash", body: "Complete KYC to unlock larger limits." },
      { userId: demo.id, type: "WARNING", title: "Verify email", body: "Please verify your email to enable transfers." }
    ]
  });

  // Ticket + messages
  const ticket = await db.ticket.create({
    data: {
      reference: ref("TK"),
      userId: demo.id,
      subject: "How long does disbursement take?",
      status: "OPEN"
    }
  });
  await db.message.createMany({
    data: [
      { ticketId: ticket.id, authorId: demo.id, body: "Hi, when will my approved loan be disbursed?" },
      { ticketId: ticket.id, authorId: admin.id, body: "Hello! Disbursement typically completes within 24 hours after approval." }
    ]
  });

  await db.subscription.createMany({
    data: [{ email: "early@example.com" }, { email: "fan@example.com" }]
  });

  await db.auditLog.createMany({
    data: [
      { userId: admin.id, action: "USER_LOGIN", ip: "203.0.113.10", userAgent: "Mozilla/5.0" },
      { userId: demo.id, action: "LOAN_SUBMITTED", entity: "Loan", ip: "198.51.100.7" }
    ]
  });

  console.log("Seed complete.");
  console.log("  Admin: admin@mycoincard.cash / Admin@12345");
  console.log("  Demo:  demo@mycoincard.cash  / Demo@12345");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
