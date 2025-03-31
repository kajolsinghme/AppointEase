import express from 'express'
import { validateAuthenticationMiddleware } from '../middleware/authMiddleware.js';
import { validateUpdateProfileMiddleware } from '../middleware/userMiddleware.js';
import {getProfile, updateProfile, getAllDoctors} from "../controllers/userController.js"

const router = express.Router()

router.get("/profile", validateAuthenticationMiddleware, getProfile);
router.patch("/profile", validateAuthenticationMiddleware, validateUpdateProfileMiddleware, updateProfile);

router.get("/doctors", validateAuthenticationMiddleware, getAllDoctors);

export default router;