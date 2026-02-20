'use strict'

import jwt from 'jsonwebtoken'
import User from '../src/users/user.model.js'

export const validateJWT = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers['authorization']

        if (!token) return res.status(401).json({ message: 'No se proporcionó un token' })
        token = token.replace(/^Bearer\s+/, '')

        const { sub } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(sub)

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
        req.user = user
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).json({ message: 'Token inválido o expirado' })
    }
}