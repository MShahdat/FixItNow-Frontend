import { z } from "zod";
import { registerSchema } from "@/lib/schemas/register.schema";

type Role = "CUSTOMER" | "TECHNICIAN";


export const DAYS = [
  { label: "Sun", value: "Sunday" },
  { label: "Mon", value: "Monday" },
  { label: "Tue", value: "Tuesday" },
  { label: "Wed", value: "Wednesday" },
  { label: "Thu", value: "Thursday" },
  { label: "Fri", value: "Friday" },
  { label: "Sat", value: "Saturday" },
];

export const mapZodErrors = (issues: z.ZodIssue[]) => {
  const map: Record<string, string> = {};
  issues.forEach((issue) => {
    const key = issue.path.join(".");
    if (!map[key]) map[key] = issue.message;
  });
  return map;
};

export const buildRegisterPayload = (
  form: HTMLFormElement,
  role: Role,
  skills: string[],
  selectedDays: number[]
) => {
  const fd = new FormData(form);
  const base = {
    firstName: fd.get("firstName") as string,
    lastName: (fd.get("lastName") as string) || undefined,
    email: fd.get("email") as string,
    phone: fd.get("phone") as string,
    password: fd.get("password") as string,
  };

  if (role === "TECHNICIAN") {
    return {
      ...base,
      role: "TECHNICIAN" as const,
      bio: (fd.get("bio") as string) || undefined,
      skills,
      experience: Number(fd.get("experience")) || undefined,
      hourlyRate: Number(fd.get("hourlyRate")),
      availability: selectedDays.map((i) => DAYS[i].value),
    };
  }

  return { ...base, role: "CUSTOMER" as const };
};

// Step 1 → 2 gate (technician only): only account-level fields exist yet
export const validateAccountStep = (payload: unknown) => {
  const result = registerSchema.safeParse(payload);
  return result.success ? null : mapZodErrors(result.error.issues);
};

// Final submit: every field exists, validated against the full discriminated union
export const validateFullRegistration = (payload: unknown) => {
  const result = registerSchema.safeParse(payload);
  return result.success ? null : mapZodErrors(result.error.issues);
};