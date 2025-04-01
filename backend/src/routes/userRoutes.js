import express from 'express'
import { validateAuthenticationMiddleware } from '../middlewares/authMiddleware.js';
import { validateUpdateProfileMiddleware } from '../middlewares/userMiddleware.js';
import {getProfile, updateProfile, getAllDoctors, getDoctorById} from "../controllers/userController.js"

const router = express.Router()

router.get("/profile", validateAuthenticationMiddleware, getProfile);
router.patch("/profile", validateAuthenticationMiddleware, validateUpdateProfileMiddleware, updateProfile);
router.get("/doctors", validateAuthenticationMiddleware, getAllDoctors);
router.get("/doctors/:id", validateAuthenticationMiddleware, getDoctorById); 

export default router;