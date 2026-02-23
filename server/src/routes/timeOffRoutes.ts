import { Router } from 'express';
import { getRequests, createRequest, updateRequestStatus } from '../controllers/timeOffController';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';

const router = Router();

router.use(authenticateJWT);

router.get('/', getRequests);
router.post('/', createRequest);
router.put('/:id', authorizeRoles('admin', 'manager'), updateRequestStatus);

export default router;
