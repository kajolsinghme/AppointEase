import { z } from "zod";
import { APPOINTMENT_TYPE } from "../constants/enums.js";

export const validatorBookAppointment = z
  .object({
    doctorId: z.string().min(1, "Doctor ID is required"),
    scheduledAt: z.string().datetime(),
    type: z.enum([APPOINTMENT_TYPE.IN_PERSON, APPOINTMENT_TYPE.VIDEO_CONSULTATION], {
      errorMap: () => ({
        message: "Appointment type must be 'in-person' or 'video-consultation'",
      }),
    }),
  })
  .strict();

export const validatorRescheduleAppointment = z
  .object({
    rescheduledAt: z.string().datetime(),
  })
  .strict();
