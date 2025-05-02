import {  Router } from 'express';
import authController from '../controllers/auth.controller';
import { authonticateJWT } from '../middleware/auth.middleware';


const router = Router();

router.post('/register',authController.registerUser.bind(authController));
router.post('/login',authController.loginUser.bind(authController));
router.post('/logout',authonticateJWT,authController.LogOutUser.bind(authController));

export default router;  