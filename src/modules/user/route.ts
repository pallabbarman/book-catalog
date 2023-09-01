/* eslint-disable object-curly-newline */
import { Router } from 'express';
import validateRequest from 'middlewares/validateRequest';
import { deleteUser, getAllUsers, getUser, updateUser } from './controller';
import { updateUserValidation } from './validation';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.patch('/:id', validateRequest(updateUserValidation), updateUser);
router.delete('/:id', deleteUser);

const userRoutes = router;

export default userRoutes;
