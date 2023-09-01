/* eslint-disable object-curly-newline */
import { Router } from 'express';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';
import { deleteUser, getAllUsers, getUser, updateUser } from './controller';
import { updateUserValidation } from './validation';

const router = Router();

router.get('/', auth(USER_ROLE.ADMIN), getAllUsers);
router.get('/:id', auth(USER_ROLE.ADMIN), getUser);
router.patch('/:id', validateRequest(updateUserValidation), auth(USER_ROLE.ADMIN), updateUser);
router.delete('/:id', auth(USER_ROLE.ADMIN), deleteUser);

const userRoutes = router;

export default userRoutes;
