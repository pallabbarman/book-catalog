/* eslint-disable object-curly-newline */
import { Router } from 'express';
import validateRequest from 'middlewares/validateRequest';
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from './controller';
import { bookValidation, updateBookValidation } from './validation';

const router = Router();

router.post('/create-book', validateRequest(bookValidation), createBook);
router.get('/', getAllBooks);
router.get('/:id', getBook);
router.patch('/:id', validateRequest(updateBookValidation), updateBook);
router.delete('/:id', deleteBook);

const bookRoutes = router;

export default bookRoutes;
