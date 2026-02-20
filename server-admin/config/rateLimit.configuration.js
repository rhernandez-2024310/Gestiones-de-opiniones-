import rateLimit from "express-rate-limit";

export const requestLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Demasiadas peticiones, intenta más tarde'
        });
    }
});