import { Router } from 'express';
import auth from 'middlewares/auth';
import { USER_ROLE } from 'types/user';
import { createOrder } from './controller';

const router = Router();

router.post('/create-order', auth(USER_ROLE.CUSTOMER), createOrder);

const orderRoutes = router;

export default orderRoutes;
