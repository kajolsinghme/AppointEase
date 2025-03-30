import express from 'express'
import { validateAuthenticationMiddleware } from '../middleware/authMiddleware.js';
import { validateUpdateProfileMiddleware } from '../middleware/userMiddleware.js';
import {updateProfile} from "../controllers/userController.js"

const router = express.Router()

router.patch("/profile", validateAuthenticationMiddleware, validateUpdateProfileMiddleware, updateProfile);

export default router;