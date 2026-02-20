const jwt = require('jsonwebtoken');

exports.validateJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) return res.status(401).json({ msg: 'No hay token en la petición' });

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        req.user = { uid };
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};