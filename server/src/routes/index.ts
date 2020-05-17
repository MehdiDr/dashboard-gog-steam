import { Router } from 'express';
import steamGamesRouter from './steamGames';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/steam', steamGamesRouter);


// Export the base-router
export default router;
