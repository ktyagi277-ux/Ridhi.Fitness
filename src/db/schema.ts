import { pgTable, uuid, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const enquiries = pgTable("enquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  age: integer("age"),
  goal: text("goal"),
  struggle: text("struggle"),
  startTimeline: text("start_timeline"),
  source: text("source").notNull().default("landing_page"),
  utm: jsonb("utm"),
  status: text("status").notNull().default("new"),
  ip: text("ip"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  // Plan id from src/lib/plans.ts (e.g. "elite-90"); nullable for rows created before plans existed
  plan: text("plan"),
  // Amount in paise (₹1 = 100 paise), as Razorpay expects
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("INR"),
  razorpayOrderId: text("razorpay_order_id").notNull().unique(),
  razorpayPaymentId: text("razorpay_payment_id"),
  status: text("status").notNull().default("created"), // created | paid | failed
  utm: jsonb("utm"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
});

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
