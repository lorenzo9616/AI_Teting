import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/register', authenticateJWT, authorizeRoles('admin', 'manager'), register); 

export default router;
