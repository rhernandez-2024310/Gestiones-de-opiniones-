import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, updateProfile } from './user.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { checkValidators } from '../../middlewares/check-validators.js';

const router = Router();

router.post('/register', [
    body('name', 'El nombre es obligatorio').notEmpty(),
    body('email', 'Email inválido').isEmail(),
    body('password', 'Mínimo 6 caracteres').isLength({ min: 6 }),
    checkValidators
], register);

router.post('/login', [
    body('loginKey', 'Email o Username es requerido').notEmpty(),
    body('password', 'Password requerido').notEmpty(),
    checkValidators
], login);

router.put('/update', [
    validateJWT, 
    body('oldPassword', 'Debe ingresar su contraseña actual').notEmpty(),
    checkValidators
], updateProfile);

export default router;