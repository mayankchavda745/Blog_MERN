import express from 'express';
import AuthController from "../controller/authController.js"

const router = express.Router();

router.post("/user/register",AuthController.userRegistration);
router.post("/user/login",AuthController.userLogin);

export default router;