import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authonticateJWT, authorizeRoles } from '../middleware/auth.middleware';

const router=Router();

router.get('/me', authonticateJWT, userController.getCurrentUser.bind(userController));
router.put('/me', authonticateJWT,userController.updateUser.bind(userController));
router.delete('/me',authonticateJWT,userController.deleteUser.bind(userController));

export default router;