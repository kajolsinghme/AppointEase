import { z } from "zod";

export const validatorUpdateProfile = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name cannot exceed 50 characters")
      .optional(),
    profileImage: z.string().optional(),
    specialization: z
      .string()
      .optional(),
    mobile: z
      .string()
      .max(10, "Mobile number must be exactly 10 digits")
      .optional(),
    yearsOfExperience: z
      .number()
      .min(0, "Experience cannot be negative")
      .max(80, "Experience cannot exceed 80 years")
      .optional(),
    clinicAddress: z
      .string()
      .optional(),
    city: z
      .string()
      .optional(),
    state: z
      .string()
      .optional(),
    consultationFee: z
      .number()
      .min(0, "Consultation fee cannot be negative")
      .max(100000, "Consultation fee is too high")
      .optional(),
    availability: z
      .array(
        z.object({
          day: z.enum(
            [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            "Invalid day"
          ),
          startTime: z.string(),
          endTime: z.string(),
        })
      )
      .optional(),
    illnesses: z
      .array(z.string().min(1, "Illness name cannot be empty"))
      .optional(),
  })
  .strict();
