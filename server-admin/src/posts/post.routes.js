import { Router } from 'express';
import { body } from 'express-validator';
import { createPost, getPosts, getPostById, updatePost, deletePost } from './post.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { checkValidators } from '../../middlewares/check-validators.js';

const router = Router();

// Públicas
router.get('/', getPosts);
router.get('/:id', getPostById);

// Privadas
router.post('/', [
    validateJWT,
    body('title', 'El título es obligatorio').notEmpty(),
    body('category', 'La categoría es obligatoria').notEmpty(),
    body('content', 'El texto de la publicación es obligatorio').notEmpty(),
    checkValidators
], createPost);

router.put('/:id', [
    validateJWT,
    checkValidators
], updatePost);

router.delete('/:id', [validateJWT], deletePost);

export default router;