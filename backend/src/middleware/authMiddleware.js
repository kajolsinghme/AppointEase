import { validatorRegisterUser, validatorLoginUser } from "../validators/authValidator.js";
import {fromZodError} from "zod-validation-error"
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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

export const validateAuthenticationMiddleware = async(req, res, next) => {

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            console.log(decoded)
            req.user =  await User.findById(decoded.userId)

            if (!req.user) {
                return res.status(401).json({ success: false, message: "User not found" });
            }

            next()
        }
        catch(error){
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }
    }
    else{
        return res.status(401).json({ success: false, message: "No token provided" });
    }  
}
