import { z } from "zod";

export const validatorUpdateProfile = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").max(50, "Name cannot exceed 50 characters").optional(),
    specialization: z.string().min(3, "Specialization must be at least 3 characters long").max(100, "Specialization cannot exceed 100 characters").optional(),
    yearsOfExperience: z.number().min(0, "Experience cannot be negative").max(100, "Experience cannot exceed 100 years").optional(),
    clinicAddress: z.string().min(5, "Clinic address must be at least 5 characters long").max(200, "Clinic address cannot exceed 200 characters").optional(),
    consultationFee: z.number().min(0, "Consultation fee cannot be negative").max(100000, "Consultation fee is too high").optional(),
    availability: z.array(
        z.object({
            day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "Invalid day"),
            startTime: z.string(),
            endTime: z.string()
        })
    ).optional(),
}).strict();