import { Router } from 'express';
import { body } from 'express-validator';
import { addComment, getCommentsByPost, updateComment, deleteComment } from './comment.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { checkValidators } from '../../middlewares/check-validators.js';

const router = Router();

router.get('/post/:postId', getCommentsByPost);

router.post('/', [
    validateJWT,
    body('text', 'El comentario no puede estar vacío').notEmpty(),
    body('post', 'ID de post inválido').isMongoId(),
    checkValidators
], addComment);

router.put('/:id', [
    validateJWT,
    body('text', 'El nuevo texto es obligatorio').notEmpty(),
    checkValidators
], updateComment);

router.delete('/:id', validateJWT, deleteComment);

export default router;