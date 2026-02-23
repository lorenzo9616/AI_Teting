import { Router } from 'express';
import { getEmployees, updateEmployee } from '../controllers/employeeController';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';

const router = Router();

router.use(authenticateJWT);

router.get('/', authorizeRoles('admin', 'manager'), getEmployees);
router.put('/:id', authorizeRoles('admin'), updateEmployee);

export default router;
