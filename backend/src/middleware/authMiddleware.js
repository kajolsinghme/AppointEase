import { validatorRegisterUser, validatorLoginUser } from "../../validators/authValidator.js";
import {fromZodError} from "zod-validation-error"

export const validateRegisterUserMiddleware = (req, res, next) => {
    const validationResult = validatorRegisterUser.safeParse(req.body);

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

export const validateLoginUserMiddleware = (req, res, next) => {
    const validationResult = validatorLoginUser.safeParse(req.body);

    if(!validationResult.success){
        const formattedError = fromZodError(validationResult.error)
        return res.status(400).json({
            success: false,
            message: formattedError.message,
        });
    }
    else{
        next();
    }
}