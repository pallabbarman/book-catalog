import { Router } from 'express';
import validateRequest from 'middlewares/validateRequest';
import { createUser } from './controller';
import { userValidation } from './validation';

const router = Router();

router.post('/signup', validateRequest(userValidation), createUser);

const authRoutes = router;

export default authRoutes;
