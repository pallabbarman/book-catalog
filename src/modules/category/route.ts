import { Router } from 'express';
import validateRequest from 'middlewares/validateRequest';
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategory,
    updateCategory,
} from './controller';
import { CategoryValidation, updateCategoryValidation } from './validation';

const router = Router();

router.post('/create-category', validateRequest(CategoryValidation), createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.patch('/:id', validateRequest(updateCategoryValidation), updateCategory);
router.delete('/:id', deleteCategory);

const categoryRoutes = router;

export default categoryRoutes;
