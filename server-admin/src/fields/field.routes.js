import { Router } from 'express';
import { body } from 'express-validator';
import { createField, getFields, updateField } from './field.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { checkValidators } from '../../middlewares/check-validators.js';
import { upload } from '../../middlewares/file-uploader.js';

const router = Router();

router.get('/', getFields);

router.post('/', [
    validateJWT,
    upload.single('image'), 
    body('name', 'El nombre es requerido').notEmpty(),
    body('price', 'El precio debe ser un número').isNumeric(),
    checkValidators
], createField);

router.put('/:id', [
    validateJWT,
    upload.single('image'),
    checkValidators
], updateField);

export default router;