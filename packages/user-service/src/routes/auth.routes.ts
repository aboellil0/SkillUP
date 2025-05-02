import {  Router } from 'express';
import authController from '../controllers/auth.controller';


const router = Router();

router.post('/register',authController.registerUser.bind(authController));
router.post('/login',authController.loginUser.bind(authController));
router.post('/logout',authController.LogOutUser.bind(authController));

export default router;