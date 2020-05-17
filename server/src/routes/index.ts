import { Router } from 'express';
import UserRouter from './Users';
import steamGamesRouter from './steamGames';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/steam', steamGamesRouter);


// Export the base-router
export default router;
