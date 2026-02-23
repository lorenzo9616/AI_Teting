import { Router } from 'express';
import { getShifts, createShift, updateShift, deleteShift } from '../controllers/scheduleController';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';

const router = Router();

router.use(authenticateJWT);

router.get('/', getShifts);
router.post('/', authorizeRoles('admin', 'manager'), createShift);
router.put('/:id', authorizeRoles('admin', 'manager'), updateShift);
router.delete('/:id', authorizeRoles('admin', 'manager'), deleteShift);

export default router;
