import { Router } from 'express';
import games from './games';
import users from './users';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/games', games);
router.use('/users', users);


// Export the base-router
export default router;
