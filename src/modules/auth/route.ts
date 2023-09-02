import { Router } from 'express';
import validateRequest from 'middlewares/validateRequest';
import { createUser, loginUser } from './controller';
import { loginValidation, userValidation } from './validation';

const router = Router();

router.post('/signup', validateRequest(userValidation), createUser);
router.post('/signin', validateRequest(loginValidation), loginUser);

const authRoutes = router;

export default authRoutes;
