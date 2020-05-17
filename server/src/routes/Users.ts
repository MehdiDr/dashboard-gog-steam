import { Request, Response, Router } from 'express';
import { OK } from 'http-status-codes';

import UserDao from '@daos/User/UserDao.mock';

// Init shared
const router = Router();
const userDao = new UserDao();

router.get('/all', async (req: Request, res: Response) => {
    const users = await userDao.getAll();
    return res.status(OK).json({users});
});

export default router;
