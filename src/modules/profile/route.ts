import { Router } from 'express';
import auth from 'middlewares/auth';
import { USER_ROLE } from 'types/user';
import { getProfile } from './controller';

const router = Router();

router.get('/', auth(USER_ROLE.CUSTOMER, USER_ROLE.ADMIN), getProfile);

const profileRoutes = router;

export default profileRoutes;
