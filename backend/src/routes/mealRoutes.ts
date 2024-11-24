import express, { Router } from 'express';
import { auth } from '../middleware/auth';
import { 
    addMealPlan,
    updateMealPlan,
    getMealPlans,
    deleteMealPlan 
} from '../controllers/mealController';

const router: Router = express.Router();

router.post('/meal-plan', auth, addMealPlan as express.RequestHandler);
router.put('/meal-plan/:id', auth, updateMealPlan as express.RequestHandler);
router.get('/meal-plans', auth, getMealPlans as express.RequestHandler);
router.delete('/meal-plan/:id', auth, deleteMealPlan as express.RequestHandler);

export default router;