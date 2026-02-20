import User from './user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const data = req.body;
        const user = new User(data);
        user.password = await bcrypt.hash(data.password, 10);
        await user.save();
        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al registrar', error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { loginKey, password } = req.body;
        const user = await User.findOne({
            $or: [{ email: loginKey }, { username: loginKey }]
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { sub: user._id, role: 'USER_ROLE' }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN, issuer: process.env.JWT_ISSUER }
        );

        res.status(200).json({ success: true, message: `Bienvenido ${user.name}`, token, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en el login', error: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { oldPassword, newPassword, ...updates } = req.body;
        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: 'La contraseña anterior no coincide' });

        if (newPassword) updates.password = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
        res.status(200).json({ success: true, message: 'Perfil actualizado', user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar', error: error.message });
    }
};