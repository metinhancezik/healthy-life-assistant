import express, { Router } from 'express';
import { auth } from '../middleware/auth';
import { 
    addHealthData,
    updateHealthData,
    getHealthData 
} from '../controllers/healthController';

const router: Router = express.Router();

router.post('/health-data', auth, addHealthData as express.RequestHandler);
router.put('/health-data', auth, updateHealthData as express.RequestHandler);
router.get('/health-data', auth, getHealthData as express.RequestHandler);

export default router;