import { validatorUpdateProfile } from "../validators/userValidator.js";
import {fromZodError} from "zod-validation-error"

export const validateUpdateProfileMiddleware = (req, res, next) => {
    const validationResult = validatorUpdateProfile.safeParse(req.body);

    if (!validationResult.success) {
        const formattedError = fromZodError(validationResult.error)
        return res.status(400).json({
            success: false,
            message: formattedError.message,
        });
    }
    else{
        next();
    }
};
