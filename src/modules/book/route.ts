import { Router } from 'express';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import { USER_ROLE } from 'types/user';
import {
    createBook,
    deleteBook,
    getAllBooks,
    getBook,
    getBooksByCategoryId,
    updateBook,
} from './controller';
import { bookValidation, updateBookValidation } from './validation';

const router = Router();

router.post('/create-book', validateRequest(bookValidation), auth(USER_ROLE.ADMIN), createBook);
router.get('/', getAllBooks);
router.get('/:id', getBook);
router.get('/:id/category', getBooksByCategoryId);
router.patch('/:id', validateRequest(updateBookValidation), auth(USER_ROLE.ADMIN), updateBook);
router.delete('/:id', auth(USER_ROLE.ADMIN), deleteBook);

const bookRoutes = router;

export default bookRoutes;
