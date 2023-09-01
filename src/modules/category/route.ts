/* eslint-disable comma-dangle */
import { Router } from 'express';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategory,
    updateCategory,
} from './controller';
import { CategoryValidation, updateCategoryValidation } from './validation';

const router = Router();

router.post(
    '/create-category',
    validateRequest(CategoryValidation),
    auth(USER_ROLE.ADMIN),
    createCategory
);
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.patch(
    '/:id',
    validateRequest(updateCategoryValidation),
    auth(USER_ROLE.ADMIN),
    updateCategory
);
router.delete('/:id', auth(USER_ROLE.ADMIN), deleteCategory);

const categoryRoutes = router;

export default categoryRoutes;
