import express from 'express';
import { getAreas, createArea, updateArea, deleteArea } from '../controllers/areaController';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';

const router = express.Router();

// Only admin/manager should manage areas
router.get('/', authenticateJWT, getAreas);
router.post('/', authenticateJWT, authorizeRoles('admin', 'manager'), createArea);
router.put('/:id', authenticateJWT, authorizeRoles('admin', 'manager'), updateArea);
router.delete('/:id', authenticateJWT, authorizeRoles('admin', 'manager'), deleteArea);

export default router;
