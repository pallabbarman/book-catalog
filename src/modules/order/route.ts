import { Router } from 'express';
import auth from 'middlewares/auth';
import { USER_ROLE } from 'types/user';
import { createOrder, getAllOrders } from './controller';

const router = Router();

router.post('/create-order', auth(USER_ROLE.CUSTOMER), createOrder);
router.get('/', auth(USER_ROLE.CUSTOMER, USER_ROLE.ADMIN), getAllOrders);

const orderRoutes = router;

export default orderRoutes;
