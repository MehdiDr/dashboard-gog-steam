import { Router } from 'express';
import steamGamesRouter from './steamGames';
import gogGamesRouter from './gogGames';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/steam', steamGamesRouter);
router.use('/gog', gogGamesRouter);


// Export the base-router
export default router;
