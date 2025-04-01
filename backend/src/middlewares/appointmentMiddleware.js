import { fromZodError } from "zod-validation-error";
import {validatorBookAppointment} from "../validators/appointmentValidator.js"

export const validateBookAppointmentMiddleware = (req, res, next) => {
  const validationResult = validatorBookAppointment.safeParse(req.body);

  if (!validationResult.success) {
    const formattedError = fromZodError(validationResult.error);
    return res
      .status(400)
      .json({ success: false, message: formattedError.message });
  } else {
    next();
  }
};

