import express from 'express';
import * as controller from '../controllers/book.controller.js';

const router = express.Router();

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBookById);
router.post('/', controller.createBook);
router.delete('/:id', controller.deleteBook);

export default router;
