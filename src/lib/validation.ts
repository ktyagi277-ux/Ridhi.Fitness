import { z } from "zod";
import { PLAN_IDS } from "@/lib/plans";

export const GOAL_OPTIONS = [
  "3–5 kg — just want to feel lighter",
  "5–10 kg — ready for a visible change",
  "10–20 kg — serious transformation",
  "20+ kg — full lifestyle overhaul",
] as const;

export const STRUGGLE_OPTIONS = [
  "PCOS / Thyroid / hormonal issues",
  "No time — hectic work schedule",
  "Cravings & emotional eating",
  "Tried many diets, nothing lasts",
  "Postpartum weight",
  "Just don't know where to start",
] as const;

export const TIMELINE_OPTIONS = [
  "Immediately — I'm ready",
  "Within 2 weeks",
  "This month",
  "Just exploring for now",
] as const;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{10,16}$/, "Please enter a valid 10-digit WhatsApp number"),
  age: z
    .union([z.literal(""), z.coerce.number().int().min(16, "Age must be 16 or above").max(80, "Please enter a valid age")])
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : v)),
  goal: z.string().trim().max(120).optional(),
  struggle: z.string().trim().max(160).optional(),
  startTimeline: z.string().trim().max(120).optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "Please allow us to contact you about the program",
  }),
  source: z.string().trim().max(60).optional(),
  utm: z.record(z.string(), z.string().max(300)).optional(),
  company: z.string().max(0).optional(), // honeypot — must stay empty
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const paymentOrderSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{10,16}$/, "Please enter a valid 10-digit WhatsApp number"),
  planId: z.enum(PLAN_IDS, { message: "Please pick a plan" }),
  utm: z.record(z.string(), z.string().max(300)).optional(),
});

export type PaymentOrderInput = z.infer<typeof paymentOrderSchema>;

export const paymentVerifySchema = z.object({
  razorpay_order_id: z.string().trim().min(1).max(120),
  razorpay_payment_id: z.string().trim().min(1).max(120),
  razorpay_signature: z.string().trim().min(1).max(200),
});

export type PaymentVerifyInput = z.infer<typeof paymentVerifySchema>;
