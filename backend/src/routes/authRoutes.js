import express from "express"
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateLoginUserMiddleware, validateRegisterUserMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/register', validateRegisterUserMiddleware, registerUser)
router.post('/login', validateLoginUserMiddleware, loginUser)

export default router;