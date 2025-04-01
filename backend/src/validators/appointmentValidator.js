import { z } from "zod";

export const validatorBookAppointment = z.object({
  doctorId: z.string().min(1, "Doctor ID is required"),
  scheduledAt: z.string().datetime(),
  type: z.enum(["in-person", "video-consultation"], {
    errorMap: () => ({
      message: "Appointment type must be 'in-person' or 'video-consultation'",
    }),
  }),
});
