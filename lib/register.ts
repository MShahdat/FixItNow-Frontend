import { z } from "zod";

/**
 * Mirrors the backend schema exactly (same field names, same rules) so the
 * server never rejects something the client already accepted. Two things are
 * added purely for UX and are stripped before the payload is sent to the API:
 *  - `confirmPassword`
 *  - the `agreeToTerms` checkbox (handled outside zod, see RegisterForm)
 */
const baseSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().optional(),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
  phone: z.string().min(6, "Enter a valid phone number"),
  profileImage: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
});

const customerSchema = baseSchema.extend({
  role: z.literal("CUSTOMER"),
});

const technicianSchema = baseSchema.extend({
  role: z.literal("TECHNICIAN"),
  bio: z.string().optional(),
  skills: z.array(z.string()).min(1, "Add at least one skill"),
  experience: z.coerce.number().min(0, "Enter a valid number of years").optional(),
  hourlyRate: z.coerce.number().min(1, "Set your hourly rate"),
  availability: z.array(z.string()).min(1, "Select at least one working day"),
});

export const registerFormSchema = z
  .discriminatedUnion("role", [customerSchema, technicianSchema])
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

// Field groups used to validate each step before letting the user move on.
export const accountStepFields = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "password",
  "confirmPassword",
] as const;

export const profileStepFields = [
  "bio",
  "skills",
  "experience",
  "hourlyRate",
  "availability",
] as const;

export const WEEK_DAYS = [
  { label: "M", value: "MON" },
  { label: "T", value: "TUE" },
  { label: "W", value: "WED" },
  { label: "T", value: "THU" },
  { label: "F", value: "FRI" },
  { label: "S", value: "SAT" },
  { label: "S", value: "SUN" },
] as const;

/** Strips UI-only fields before the payload goes to the API. */
export function toRegisterPayload(values: RegisterFormValues) {
  const { confirmPassword: _confirmPassword, ...payload } = values as RegisterFormValues & {
    confirmPassword: string;
  };
  return payload;
}

