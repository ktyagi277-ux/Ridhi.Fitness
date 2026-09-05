import { z } from "zod";

export const MEDICAL_OPTIONS = [
  "None",
  "PCOS / PCOD",
  "Thyroid",
  "Diabetes / pre-diabetes",
  "High BP / cholesterol",
  "Postpartum",
  "Other",
] as const;

export const CONCERN_OPTIONS = [
  "Belly fat",
  "Overall weight loss",
  "Hormonal issues (PCOS / thyroid)",
  "Low energy & poor sleep",
  "Cravings & emotional eating",
  "Toning & strength",
  "Other",
] as const;

export const TIME_OPTIONS = [
  "Morning (9 am – 12 pm)",
  "Afternoon (12 – 4 pm)",
  "Evening (4 – 8 pm)",
  "Anytime",
] as const;

export const INVEST_OPTIONS = [
  "Yes — ready to start now",
  "Yes — within this month",
  "Not sure, want to understand first",
  "Just exploring for now",
] as const;

export { COUNTRIES as COUNTRY_OPTIONS } from "@/lib/countries";

const requiredText = (label: string, max: number) =>
  z.string().trim().min(1, `Please fill in ${label}`).max(max, `${label} is too long`);

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long"),
  age: z.coerce.number({ message: "Please enter your age" }).int().min(16, "Age must be 16 or above").max(80, "Please enter a valid age"),
  height: requiredText("your height", 30),
  weight: requiredText("your weight", 30),
  profession: requiredText("your profession", 80),
  medicalHistory: requiredText("medical history", 120),
  majorConcern: requiredText("your major concern", 120),
  preferredTime: requiredText("preferred time to connect", 60),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{10,16}$/, "Please enter a valid contact number"),
  readyToInvest: requiredText("this answer", 80),
  country: requiredText("your country", 60),
  expectedOutcome: z.string().trim().max(500, "Please keep this under 500 characters").optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "Please allow us to contact you about the program",
  }),
  source: z.string().trim().max(60).optional(),
  utm: z.record(z.string(), z.string().max(300)).optional(),
  company: z.string().max(0).optional(), // honeypot — must stay empty
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
